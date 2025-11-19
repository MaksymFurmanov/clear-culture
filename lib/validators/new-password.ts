import { z } from "zod";

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .nonempty("Enter your new password")
      .min(8, "Password too short")
      .max(50, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/\d/, "Password must contain at least one number"),
    repeatPassword: z
      .string()
      .trim()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        path: ["repeatPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom
      });
    }
  });

export type NewPasswordInput = z.infer<typeof newPasswordSchema>;