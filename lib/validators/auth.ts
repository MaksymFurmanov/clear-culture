import { z } from "zod";
import validator from "validator";

export const loginSchema = z.object({
  email: z
    .string()
    .trim(),
  password: z
    .string()
    .trim()
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name too short")
      .max(30, "Name is too long"),
    email: z
      .string()
      .trim()
      .refine(validator.isEmail, "Invalid email"),
    password: z
      .string()
      .trim()
      .min(8, "Password too short")
      .max(50, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .trim()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
export type RegisterInput = z.infer<typeof registerSchema>;