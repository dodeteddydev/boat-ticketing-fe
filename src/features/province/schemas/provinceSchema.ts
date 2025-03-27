import { z } from "zod";

export const provinceSchema = z.object({
  provinceName: z
    .string({ required_error: "Province is required" })
    .min(1, "Province is required"),
  provinceCode: z
    .string({ required_error: "Code is required" })
    .min(1, "Code is required"),
  countryId: z
    .number({ required_error: "Country is required" })
    .min(1, "Country is required"),
});

export type Province = z.infer<typeof provinceSchema>;
