import { TUser } from "./auth.types";
import { TCar } from "./car.types";

export type TBooking = {
  car: TCar;
  createdAt: string;
  date: string;
  endTime: string | null;
  startTime: string;
  endDate: string;
  totalCost: number;
  updatedAt: string;
  user: TUser;
  __v: number;
  _id: string;
};
