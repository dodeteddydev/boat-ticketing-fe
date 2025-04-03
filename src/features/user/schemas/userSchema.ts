import { z } from "zod";

export const userSchema = z.object({
  role: z.string().default("boatadmin"),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .refine(
      (value) => value.length >= 6,
      "Password must be at least 6 character"
    ),
});

export type User = z.infer<typeof userSchema>;
