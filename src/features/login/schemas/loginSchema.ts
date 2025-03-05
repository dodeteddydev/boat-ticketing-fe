import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string({ required_error: "Username or Email is required" })
    .min(1, "Username or email is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .refine(
      (value) => value.length >= 6,
      "Password must be at least 6 character"
    ),
});

export type Login = z.infer<typeof loginSchema>;
