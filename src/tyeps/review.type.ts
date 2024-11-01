import { TUser } from "./auth.types";
import { TCar } from "./car.types";

export type TReview = {
  car: TCar;
  rating: number;
  userReview: string;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  __v: number;
  _id: string;
};
