"use server";

import bcrypt, { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserFormData, userSchema } from "@/lib/validators/user";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import PasswordChangeEmailTemplate from "@/components/emails/password-change-email-template";
import { Resend } from "resend";

export async function isAuthenticated(): Promise<boolean> {
  const authUserSession = await getServerSession(authOptions);
  return !!authUserSession?.user?.id;
}

export async function getUserId(): Promise<string> {
  const authUserSession = await getServerSession(authOptions);
  if (!authUserSession?.user?.id) throw new Error("Authorization error");
  return authUserSession.user.id;
}

export async function getUserEmail(): Promise<string> {
  const authUserSession = await getServerSession(authOptions);
  if (!authUserSession?.user?.email) throw new Error("Authorization error");
  return authUserSession.user.email;
}

export async function getUserIdByEmail(email: string): Promise<string | undefined> {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  return user?.id;
}

export async function getAuthProvider(): Promise<string> {
  const authUserSession = await getServerSession(authOptions);
  if (!authUserSession?.user?.provider) throw new Error("Authorization error");
  return authUserSession.user.provider;
}

export async function changeUserInfo(data: UserFormData): Promise<void> {
  const id = await getUserId();
  const parsed = userSchema.parse(data);

  await prisma.user.update({
    where: { id },
    data: { name: parsed.name }
  });

  revalidatePath("/");
}

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (existingUser) throw new Error("User with this email already exists");

  const hashedPassword = await hash(parsed.password, 10);

  return prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword
    }
  });
}

async function generateToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);
  const expiresAtMs = Date.now() + (5 * 60000);

  await prisma.passwordChangeToken.create({
    data: {
      token: hashedToken,
      userId: userId,
      expiresAt: new Date(expiresAtMs)
    }
  });

  return token;
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

  return await generateToken(userId);
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function changePasswordWithEmail(email: string): Promise<void> {
  const userId = await getUserIdByEmail(email);

  if (!userId) throw new Error("No user with this email found");

  const token = await generateToken(userId);

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Clear Culture New Password",
    react: PasswordChangeEmailTemplate({
      link: `${process.env.APP_URL}/new-password?token=${token}`
    })
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function changePassword(token: string, newPassword: string): Promise<void> {
  const tokenEntries = await prisma.passwordChangeToken.findMany();

  const compRes = await Promise.all(
    tokenEntries.map(t => bcrypt.compare(token, t.token))
  );

  const tokenEntry = tokenEntries[
    compRes.findIndex(res => res === true)
    ];

  if (!tokenEntry || tokenEntry.expiresAt.getTime() < Date.now()) {
    throw new Error("The link is invalid or expired");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: tokenEntry.userId },
    data: { password: hashed }
  });

  await prisma.passwordChangeToken.delete({
    where: { id: tokenEntry.id }
  });
}

export async function isEmailExists(email: string): Promise<boolean> {
  return !!prisma.user.findUnique({ where: { email } });
}