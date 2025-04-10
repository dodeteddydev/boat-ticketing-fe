import { z } from "zod";

export const portSchema = z.object({
  portName: z
    .string({ required_error: "Port is required" })
    .min(1, "Port is required"),
  portCode: z
    .string({ required_error: "Code is required" })
    .min(1, "Code is required"),
  countryId: z
    .number({ required_error: "Country is required" })
    .min(1, "Country is required"),
  provinceId: z
    .number({ required_error: "Province is required" })
    .min(1, "Province is required"),
  cityId: z
    .number({ required_error: "City is required" })
    .min(1, "City is required"),
});

export type Port = z.infer<typeof portSchema>;
