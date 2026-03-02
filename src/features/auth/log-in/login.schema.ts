import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim(),
  password: z
    .string()
    .trim()
});

export type LoginInput = z.infer<typeof loginSchema>;