'use server';

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import validator from "validator";
import testUser from "@/data/placeholders/user";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .refine(validator.isMobilePhone, { message: "Invalid phone number" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Invalid password" })
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: {
        phoneNumber: ["Invalid phone number or password"]
      }
    };
  }

  const { phoneNumber, password } = result.data;

  if (phoneNumber !== testUser.phone_number || password !== testUser.password) {
    return {
      errors: {
        phoneNumber: ["Invalid phone number or password"]
      }
    };
  }

  await createSession(testUser.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}