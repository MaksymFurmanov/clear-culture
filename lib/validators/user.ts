import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim()
});

export type UserFormData = z.infer<typeof userSchema>;