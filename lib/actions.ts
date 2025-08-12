'use server';

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import validator from "validator";
import { getUserByLoginData } from "@/lib/db-actions/user";

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
  const user = await getUserByLoginData(phoneNumber, password);

  if (!user) {
    return {
      errors: {
        phoneNumber: ["Invalid phone number or password"]
      }
    };
  }

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}