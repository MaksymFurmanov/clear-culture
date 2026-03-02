import { z } from "zod";
import validator from "validator";

export const emailSchema = z
  .object({
    email: z
      .string()
      .trim()
      .refine(validator.isEmail, "Invalid email")
  });

export type EmailFormInput = z.infer<typeof emailSchema>;