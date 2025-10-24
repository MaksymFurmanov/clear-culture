import z from "zod";
import validator, { PostalCodeLocale } from "validator";
import countryLocaleMap, { countries } from "@/containers/addresses/countryLocaleMap";

export const addressSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .nonempty("First name required"),
    lastName: z
      .string()
      .trim()
      .nonempty("Last name required"),
    email: z
      .string()
      .trim()
      .refine(validator.isEmail, "Invalid email"),
    phoneNumber: z
      .string()
      .trim()
      .refine(validator.isMobilePhone, "Invalid phone number"),
    country: z
      .enum(countries as [string, ...string[]]),
    city: z
      .string()
      .trim()
      .nonempty("City required"),
    streetAddress: z
      .string()
      .trim()
      .nonempty("Street address required"),
    zipCode: z
      .string()
      .trim()
      .nonempty("ZIP code required")
  })
  .superRefine((data, ctx) => {
    const locale = countryLocaleMap.get(data.country);

    if (!locale) {
      ctx.addIssue({
        path: ["country"],
        message: "Unsupported country",
        code: z.ZodIssueCode.custom
      });
    } else if (!validator.isPostalCode(data.zipCode,
      locale as PostalCodeLocale)) {
      ctx.addIssue({
        path: ["zipCode"],
        message: `Invalid postal code for ${data.country}`,
        code: z.ZodIssueCode.custom
      });
    }
  });

export type AddressInput = z.infer<typeof addressSchema>;