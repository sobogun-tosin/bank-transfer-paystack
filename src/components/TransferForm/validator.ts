import { object, string } from "yup";

export const accountVerificationFormValidationSchema = object({
  bank: string().required("Please enter bank"),
  account_number: string()
    .required("Please enter bank number")
    .min(10, "Invalid bank number")
    .max(10, "Invalid bank number"),
});

export const completeTransferValidationSchema = object({
  amount: string().required("Please enter amount").min(3, "Minimum of ₦100"),
  description: string().required("Pleaase state reason for trasfer"),
});
