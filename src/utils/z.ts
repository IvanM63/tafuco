import { object, string } from "zod";

export const paymentSchema = object({
  cardNumber: string({ required_error: "Card Number is required" })
    .min(1, { message: "Card number must be 16 digits." })
    .max(19, { message: "Card number must be 16 digits." }),
  expDate: string({ required_error: "Password is required" })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY Format")
    .min(1, "Name Required.")
    .max(32, "Name must be less than 32 characters"),
  cvv: string({ required_error: "CVV is required" })
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits"),
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
});

export const basicInfoSchema = object({
  fullName: string({ required_error: "Name is required" })
    .min(1, "Name Required.")
    .max(32, "Name must be less than 32 characters"),
  username: string({ required_error: "username is required" })
    .min(1, "username Required.")
    .max(32, "username must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email Required.")
    .email("Invalid Email"),
  gender: string({ required_error: "Gender must be define" })
    .min(1, "Gender invalid.")
    .max(10, "Gender not valid"),
});

export const shippingSchema = object({
  firstName: string({ required_error: "Name is required" })
    .min(1, "Name Required.")
    .max(32, "Name must be less than 32 characters"),
  lastName: string({ required_error: "Password is required" })
    .min(1, "Name Required.")
    .max(32, "Name must be less than 32 characters"),
  phone: string({ required_error: "Phone Number is required" })
    .min(11, "Phone Number invalid.")
    .max(20, "Phone Number not valid"),
  address: string({ required_error: "Address is required" })
    .min(1, "Address Required.")
    .max(32, "Address is too long"),
  city: string({ required_error: "City is required" })
    .min(1, "Name Required.")
    .max(32, "Address is too long"),
  country: string({ required_error: "Country is required" })
    .min(1, "Country Required.")
    .max(32, "Country must be less than 32 characters"),
});

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email Required.")
    .email("Invalid Email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password Required.")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = object({
  fullName: string({ required_error: "Name is required" }).min(
    1,
    "Enter your name here"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email Required.")
    .email("Invalid Email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password Required.")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Confirm Password is required" })
    .min(1, "Password Required.")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password don't match",
  path: ["confirmPassword"],
});
