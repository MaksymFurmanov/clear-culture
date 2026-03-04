"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { UserFormData, userSchema } from "@/src/features/user/profile/name.schema";

export async function getUserId(): Promise<string> {
  const authUserSession = await auth();
  if (!authUserSession?.user?.id) throw new Error("Authorization error");
  return authUserSession.user.id;
}

export async function getUserEmail(): Promise<string> {
  const authUserSession = await auth();
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
  const authUserSession = await auth();
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