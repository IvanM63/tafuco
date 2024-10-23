"use server";

import { signIn } from "next-auth/react";
import { prisma } from "../db";
import { signUpSchema } from "../z";
import bcryptjs from "bcryptjs";

export const handleSignUp = async ({
  fullName,
  email,
  password,
  confirmPassword,
}: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const parseData = signUpSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });
    if (!parseData.success) return { success: false, message: "Invalid Data" };

    //Check if email already exist
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return {
        success: false,
        message: "Email already exist. Please login to continue",
      };

    //Hash Password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { fullName, email, password: hashedPassword, username: email },
    });
    if (newUser.id)
      //TODO ADD NOTIF TO TOASTER
      return {
        success: true,
        message: "Success create account",
      };
  } catch (error) {
    console.log("Error when creating account: ", error);

    return {
      success: false,
      message: "An unexpected error, please try again.",
    };
  }
};

export const handleSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
    return {
      success: true,
      message: "Login Success",
    };
  } catch (error) {
    console.log("Something wrong when sign in: ", error);
    return {
      success: false,
      message: "Something wrong when sign in",
    };
  }
};
