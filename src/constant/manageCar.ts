export const carFeaturesOptions = [
  { value: "AC", label: "AC" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "Long Range Battery", label: "Long Range Battery" },
  { value: "GPS", label: "GPS" },
];

export const carColorOptions = [
  { value: "White", label: "White" },
  { value: "Black", label: "Black" },
  { value: "Blue", label: "Blue" },
];

export const carTypeOptions = [
  { value: "SUV", label: "SUV" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Sedan", label: "Sedan" },
];

export const additionalFeaturesOptions = [
  { value: "Insurance", label: "Insurance" },
  { value: "Child_Seat", label: "Child Seat" },
  ...carFeaturesOptions,
];

export const carLocationOptions = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "Notunbazar", label: "Notunbazar" },
  { value: "Rampura", label: "Rampura" },
  { label: "Jatrabari", value: "Jatrabari" },
  { label: "Bosundhora", value: "Bosundhora" },
  { label: "Demra", value: "Demra" },
];

export const TypeOfUpdateQuantity = {
  increment: "increment",
  decrement: "decrement",
} as const;

export const insuranceOptions = [
  { value: "Liability", label: "Liability Insurance" },
  { value: "Collision", label: "Collision Insurance" },
  { value: "Comprehensive", label: "Comprehensive Insurance" },
  { value: "PIP", label: "Personal Injury Protection (PIP)" },
  {
    value: "Uninsured/Underinsured",
    label: "Uninsured/Underinsured Motorist Coverage",
  },
];
