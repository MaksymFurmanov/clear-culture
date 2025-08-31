'use server';

import { z } from "zod";
import validator from "validator";
import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .refine(validator.isEmail, { message: "Invalid email" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Invalid password" })
});

export async function logInAction(email: string, password: string) {
  const parsed = loginSchema.parse({ email, password });

  const user = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (!user) throw new Error("Invalid email or password");

  const isValid = await compare(parsed.password, user?.password || "");
  if (!isValid) throw new Error("Invalid email or password");

  return { id: user.id, email: user.email, name: user.name };
}

export async function signUpAction(email: string,
                                   password: string,
                                   name: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  return prisma.user.create({
    data: { email, name, password: hashedPassword },
  });
}