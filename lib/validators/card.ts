import { z } from "zod";

export const cardSchema = z.object({
  number: z
    .string()
    .trim()
    .regex(/^(\d{4} ?){3,4}\d{1,4}$/, "Card number must be 13–19 digits"),
  valid: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format")
    .refine((value) => {
      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      return (
        year > currentYear ||
        (year === currentYear && month >= currentMonth)
      );
    }, "Card is expired"),
  SVV: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, "Invalid CVV"),
  name: z
    .string()
    .trim()
    .min(2, "Cardholder name is required")
});