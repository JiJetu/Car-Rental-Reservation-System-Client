import { z } from "zod";

export const addCarSchema = z.object({
  name: z
    .string({ required_error: "Please select a name" })
    .min(1, "Name cannot be empty"),
  shortDescription: z
    .string({ required_error: "Please provide a short description" })
    .min(1, "Short description cannot be empty"),
  description: z
    .string({ required_error: "Please provide a description" })
    .min(1, "Description cannot be empty"),
  color: z
    .string({ required_error: "Please select a color" })
    .min(1, "Color cannot be empty"),
  location: z
    .string({ required_error: "Please select a location" })
    .min(1, "Location cannot be empty"),
  type: z
    .string({ required_error: "Please select a type" })
    .min(1, "Type cannot be empty"),
  carImage: z.instanceof(File, {
    message: "Please select an image for the car",
  }),
  features: z
    .array(z.string(), {
      required_error: "Please select at least one feature",
    })
    .min(1, "Please select at least one feature"),
  pricePerHour: z.coerce
    .number({ required_error: "Please enter a price per hour" })
    .positive("Price per hour must be a positive number"),
  isElectric: z.boolean().optional(),
});
