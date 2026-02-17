"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";
import { UserFormData, userSchema } from "@/lib/validators/user";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "@/auth";
import { sendEmailConfirmationToken } from "@/lib/actions/email-confirmaion";

export async function login(email: string, password: string) {
  await signIn("credentials", {
    email,
    password,
    redirect: false
  });
}

export async function logout() {
  await signOut({ redirect: false });
}

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (existingUser) throw new Error("User with this email already exists");

  const hashedPassword = await hash(parsed.password, 10);

  await prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword
    }
  });

  await sendEmailConfirmationToken();
}

export async function isEmailExists(email: string): Promise<boolean> {
  return !!prisma.user.findUnique({ where: { email } });
}

export async function isAuthenticated(): Promise<boolean> {
  const authUserSession = await auth();
  return !!authUserSession?.user?.id;
}

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

