export const CarStatus = {
  available: "available",
  unavailable: "unavailable",
} as const;

export type TCar = {
  _id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  isElectric: boolean;
  status: keyof typeof CarStatus;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};

export type TReturnCar = {
  bookingId: Types.ObjectId;
  endTime: string;
};
