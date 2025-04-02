import { z } from "zod";

export const citySchema = z.object({
  cityName: z
    .string({ required_error: "City is required" })
    .min(1, "City is required"),
  countryId: z
    .number({ required_error: "Country is required" })
    .min(1, "Country is required"),
  provinceId: z
    .number({ required_error: "Province is required" })
    .min(1, "Province is required"),
});

export type City = z.infer<typeof citySchema>;
