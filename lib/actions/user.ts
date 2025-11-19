"use server";

import bcrypt, { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserFormData, userSchema } from "@/lib/validators/user";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function isAuthenticated(): Promise<boolean> {
  const authUserSession = await getServerSession(authOptions);
  return !!authUserSession?.user?.id;
}

export async function getUserId(): Promise<string> {
  const authUserSession = await getServerSession(authOptions);
  if (!authUserSession?.user?.id) throw new Error("Authorization error");
  return authUserSession.user.id;
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

export async function getChangePasswordToken(currentPassword: string): Promise<string | null> {
  const userId = await getUserId();

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { password: true }
  });

  if (!user?.password) throw new Error("This account has no password");

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return null;

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(token, 10);

  await prisma.passwordChangeToken.create({
    data: {
      token: hashedToken,
      userId: userId,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    }
  });

  return token;
}

export async function changePassword(token: string, newPassword: string): Promise<void> {
  const userId = await getUserId();
  const tokenEntries = await prisma.passwordChangeToken.findMany();

  console.log(tokenEntries)
  const tokenEntry = tokenEntries.find(async t =>
    await bcrypt.compare(token, t.token));

  if (!tokenEntry) throw new Error("Invalid token");
  if (tokenEntry.expiresAt < new Date()) throw new Error("Token expired");

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed }
  });

  await prisma.passwordChangeToken.delete({
    where: { id: tokenEntry.id }
  });
}