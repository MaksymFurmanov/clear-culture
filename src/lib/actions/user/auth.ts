import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { RegisterInput, registerSchema } from "@/src/features/auth/sign-up/sign-up.schema";
import { hash } from "bcryptjs";
import { sendEmailConfirmationToken } from "@/src/lib/actions/email-confirmaion";

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

export async function isAuthenticated(): Promise<boolean> {
  const authUserSession = await auth();
  return !!authUserSession?.user?.id;
}

export async function isEmailExists(email: string): Promise<boolean> {
  return !!prisma.user.findUnique({ where: { email } });
}