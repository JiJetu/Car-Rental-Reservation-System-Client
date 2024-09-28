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
