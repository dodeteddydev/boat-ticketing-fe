import { z } from "zod";

export const countrySchema = z.object({
  countryName: z
    .string({ required_error: "Country is required" })
    .min(1, "Country is required"),
  countryCode: z
    .string({ required_error: "Code is required" })
    .min(1, "Code is required"),
});

export type Country = z.infer<typeof countrySchema>;
