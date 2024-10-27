import { z } from "zod";
import moment from "moment";

const isValidMoment = (value: any): boolean => {
  return moment.isMoment(value) && value.isValid();
};

export const bookingFormSchema = z.object({
  nidOrPassport: z
    .string({ required_error: "Please enter your NID or Passport" })
    .min(4, "NID/Passport is required"),
  drivingLicense: z
    .string({ required_error: "Please enter your Driving License" })
    .min(4, "Driving License is required"),
  pickUpDate: z.string({ required_error: "Please select a pick-up date" }),
  startTime: z
    .any()
    .refine((value) => isValidMoment(value), "Invalid time format. Use HH:mm"),
  additionalFeatures: z.array(z.string()).optional(),
});
