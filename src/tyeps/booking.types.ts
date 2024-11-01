import { TUser } from "./auth.types";
import { TCar } from "./car.types";

export type TBooking = {
  car: TCar;
  createdAt: string;
  startDate: string;
  endTime: string | null;
  startTime: string;
  endDate: string;
  totalCost: number;
  updatedAt: string;
  reviewStatus: boolean;
  transactionId: string;
  user: TUser;
  __v: number;
  _id: string;
  additionalFeatures: string[];
  additionalInsurance: string[];
  bookingConfirm?: boolean;
  canceledBooking?: boolean;
  paymentStatus?: boolean;
};
