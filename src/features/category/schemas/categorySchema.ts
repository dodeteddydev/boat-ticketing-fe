import { z } from "zod";

export const categorySchema = z.object({
  categoryName: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is required"),
  categoryCode: z
    .string({ required_error: "Code is required" })
    .min(1, "Code is required"),
});

export type Category = z.infer<typeof categorySchema>;
