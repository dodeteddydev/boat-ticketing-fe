import { z } from "zod";

export const scheduleSchema = z.object({
  schedule: z
    .string({ required_error: "Schedule is required" })
    .min(1, "Schedule is required"),
  seat: z
    .number({ required_error: "Seat is required" })
    .min(1, "Seat is required"),
  price: z
    .number({ required_error: "Price is required" })
    .min(1, "Price is required"),
  markupPrice: z.number().min(1).optional(),
  boatId: z
    .number({ required_error: "Boat is required" })
    .min(1, "Boat is required"),
  arrivalId: z
    .number({ required_error: "Arrival is required" })
    .min(1, "Arrival is required"),
  departureId: z
    .number({ required_error: "Departure is required" })
    .min(1, "Departure is required"),
});

export type Schedule = z.infer<typeof scheduleSchema>;
