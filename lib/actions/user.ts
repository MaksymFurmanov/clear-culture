"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({ where: { email: parsed.email } });
  if (existingUser) throw new Error("User with this email already exists");

  const hashedPassword = await hash(parsed.password, 10);

  return prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword,
    },
  });
}