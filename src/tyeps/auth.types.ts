export type TSignInFormValues = {
  email: string;
  password: string;
};

export type TSignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  address: string;
  termsAccepted: boolean;
};

export type TUser = {
  _id: string;
  name: string;
  userImage: string;
  email: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  createdAt?: string;
  isBlocked: boolean;
  updatedAt?: string;
  __v?: number;
};
