import { z } from "zod";

export const boatSchema = z.object({
  boatName: z
    .string({ required_error: "Boat is required" })
    .min(1, "Boat is required"),
  boatCode: z
    .string({ required_error: "Code is required" })
    .min(1, "Code is required"),
  categoryId: z
    .number({ required_error: "Category is required" })
    .min(1, "Category is required"),
  image: z
    .any()
    .optional()
    .transform((fileList) =>
      fileList instanceof FileList ? fileList[0] : fileList
    )
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file format",
    }),
});

export type Boat = z.infer<typeof boatSchema>;
