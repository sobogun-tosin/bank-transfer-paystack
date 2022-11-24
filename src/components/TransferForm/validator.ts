import { object, string } from "yup";

export const accountVerificationFormValidationSchema = object({
  bank: string().required(),
  account_number: string()
    .required("Please enter bank number")
    .min(10, "Invalid bank number, account should have a mininum of 10 digits")
    .max(10, "Invalid bank number, account should have a maximum of 10 digits"),
});

export const completeTransferValidationSchema = object({
  amount: string().required("Please enter amount").min(3, "Minimum of ₦100"),
  description: string().required("Pleaase state reason for trasfer"),
});
