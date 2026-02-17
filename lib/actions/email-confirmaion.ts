"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getUserEmail, getUserId } from "@/lib/actions/user";
import { Resend } from "resend";
import EmailConfirmationTemplate from "@/components/emails/email-confirmation-template";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const TOKEN_TTL_HOURS = 24;

export async function isVerified(userId: string): Promise<boolean> {
  const instance = await prisma.user.findFirst({
    where: { id: userId }
  });

  if (!instance) return false;

  return instance.emailVerified;
}

export default async function generateEmailToken(): Promise<string> {
  const userId = await getUserId();
  const selector = crypto.randomBytes(12).toString("hex");
  const validator = crypto.randomBytes(32).toString("hex");

  const hashedValidator = await bcrypt.hash(validator, 10);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_HOURS * 60 * 60 * 1000);

  await prisma.emailConfirmationToken.upsert({
    where: { userId },
    update: {
      selector,
      token: hashedValidator,
      expiresAt
    },
    create: {
      userId,
      selector,
      token: hashedValidator,
      expiresAt
    }
  });

  return `${selector}.${validator}`;
}

export async function sendEmailConfirmationToken(): Promise<void> {
  const email = await getUserEmail();
  const token = await generateEmailToken();

  const resend = new Resend(RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Clear Culture Email Confirmation",
    react: EmailConfirmationTemplate({
      link: `${process.env.APP_URL}/email-verification/${token}`
    })
  });

  if (error) throw new Error(error.message);
}

export async function verifyEmail(token: string): Promise<void> {
  const [selector, validator] = token.split(".");

  if (!selector || !validator) {
    throw new Error("Invalid token format");
  }

  const dbToken = await prisma
    .emailConfirmationToken.findFirst({
      where: { selector }
    });

  if (!dbToken || dbToken.expiresAt < new Date()) {
    throw new Error("The token is invalid or expired");
  }

  if (dbToken.usedAt) return;

  const isValid = await bcrypt.compare(validator, dbToken.token);

  if (!isValid) {
    throw new Error("The token is invalid or expired");
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: dbToken.userId },
      data: { emailVerified: true }
    }),
    prisma.emailConfirmationToken.update({
      where: { userId: dbToken.userId },
      data: { usedAt: new Date() }
    })
  ]);
}