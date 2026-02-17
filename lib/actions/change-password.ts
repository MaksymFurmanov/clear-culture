"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import PasswordChangeTemplate from "@/components/emails/password-change-template";
import { getUserId, getUserIdByEmail } from "@/lib/actions/user";

const TOKEN_TTL_MINUTES = 5;
const resend = new Resend(process.env.RESEND_API_KEY);

async function generatePasswordToken(userId: string): Promise<string> {
  const selector = crypto.randomBytes(12).toString("hex");
  const validator = crypto.randomBytes(32).toString("hex");

  const hashedValidator = await bcrypt.hash(validator, 10);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60_000);

  await prisma.passwordChangeToken.upsert({
    where: { userId },
    update: {
      selector,
      token: hashedValidator,
      expiresAt
    },
    create: {
      selector,
      token: hashedValidator,
      userId,
      expiresAt
    }
  });

  return `${selector}.${validator}`;
}

export async function getChangePasswordTokenWithPrevPassword(currentPassword: string): Promise<string | null> {
  const userId = await getUserId();

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { password: true }
  });

  if (!user?.password) throw new Error("This account has no password");

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return null;

  return await generatePasswordToken(userId);
}

export async function changePasswordWithEmail(email: string): Promise<void> {
  const userId = await getUserIdByEmail(email);

  if (!userId) throw new Error("No user with this email found");

  const token = await generatePasswordToken(userId);

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Clear Culture New Password",
    react: PasswordChangeTemplate({
      link: `${process.env.APP_URL}/new-password?token=${token}`
    })
  });

  if (error) throw new Error(error.message);
}

export async function changePassword(
  token: string,
  newPassword: string
): Promise<void> {
  const [selector, validator] = token.split(".");

  if (!selector || !validator) {
    throw new Error("Invalid token format");
  }

  const dbToken = await prisma
    .passwordChangeToken.findUnique({
      where: { selector }
    });

  if (!dbToken || dbToken.expiresAt < new Date()) {
    throw new Error("The link is invalid or expired");
  }

  const isValid = await bcrypt.compare(validator, dbToken.token);

  if (!isValid) {
    throw new Error("The link is invalid or expired");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: dbToken.userId },
      data: { password: hashedPassword }
    }),
    prisma.passwordChangeToken.delete({
      where: { userId: dbToken.userId }
    })
  ]);
}