import { z } from "zod";

export const addCarSchema = z.object({
  name: z.string({ required_error: "Please select a name" }),
  shortDescription: z.string({
    required_error: "Please provide a short description",
  }),
  description: z.string({ required_error: "Please provide a description" }),
  color: z.string({ required_error: "Please select a color" }),
  location: z.string({ required_error: "Please select a location" }),
  type: z.string({ required_error: "Please select a type" }),
  carImage: z.instanceof(File, {
    message: "Please select an image for the car",
  }),
  features: z.array(z.string(), {
    required_error: "Please select at least one feature",
  }),
  pricePerHour: z.coerce
    .number({ required_error: "Please enter a price per hour" })
    .positive("Price per hour must be a positive number"),
  isElectric: z.boolean().optional(),
});
