"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserFormData } from "@/containers/user-pages/account/name-form";
import { userSchema } from "@/lib/validators/user";
import { revalidatePath } from "next/cache";

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