import { z } from "zod";

export const addCarSchema = z.object({
  name: z.string({ required_error: "Please select a name" }),
  description: z.string({ required_error: "Please provide a description" }),
  color: z.string({ required_error: "Please select a color" }),
  type: z.string({ required_error: "Please select a type" }),
  features: z.array(z.string(), {
    required_error: "Please select at least one feature",
  }),
  pricePerHour: z.coerce
    .number({ required_error: "Please enter a price per hour" })
    .positive("Price per hour must be a positive number"),
  isElectric: z.boolean().optional(),
});
