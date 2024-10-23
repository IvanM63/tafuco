"use client";
import React, { useState } from "react";
import Image from "next/image";
import MyButton from "@/components/Button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import IconCheck from "/public/icons/icons_check.svg?url";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/utils/z";
import { handleSignUp } from "@/utils/actions/user.action";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const { data, status } = useSession();
  const [isTerms, setIsTerms] = useState(false);
  const router = useRouter();

  if (status && data) redirect("/");

  //Using zod resolver
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const result = await handleSignUp({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    if (!result?.success) form.setError("root", { message: result?.message });
    //Go to /sign-in after user success register
    form.reset();
    router.push("/sign-in");
  };

  return (
    <div className="container justify-center items-center flex my-4 h-full w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mx-16 text-center w-1/2 h-full justify-center items-center space-y-4"
      >
        <h1 className="py-4 font-bold text-xl">Create an account</h1>
        <Image
          alt="sign-in"
          width={227}
          height={227}
          src="/assets/bedroom-home.png"
        />
        <h1 className="flex self-start text-2xl font-semibold">
          Lets get your account set up
        </h1>
        <input
          {...form.register("fullName")}
          placeholder="Full Name"
          className="flex outline-primary-400 rounded-2xl mb-1 py-3 px-4 w-full border-2"
          type="text"
        />
        {form.formState.errors.fullName && (
          <p className="w-full text-left text-red">
            {form.formState.errors.fullName.message}
          </p>
        )}
        <input
          {...form.register("email")}
          placeholder="Email"
          className="flex outline-primary-400 rounded-2xl mb-1 py-3 px-4 w-full border-2"
          type="email"
        />
        {form.formState.errors.email && (
          <p className="w-full text-left text-red">
            {form.formState.errors.email.message}
          </p>
        )}
        <input
          {...form.register("password")}
          placeholder="Password"
          className="flex outline-primary-400 rounded-2xl mb-1 py-3 px-4 w-full border-2"
          type="password"
        />
        {form.formState.errors.password && (
          <p className="w-full text-left text-red">
            {form.formState.errors.password.message}
          </p>
        )}
        <input
          {...form.register("confirmPassword")}
          placeholder="Confirm Password"
          className="flex outline-primary-400 rounded-2xl mb-1 py-3 px-4 w-full border-2"
          type="password"
        />
        {form.formState.errors.confirmPassword && (
          <p className="w-full text-left text-red">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
        <MyButton
          disabled={form.formState.isSubmitting}
          name="Create account"
          className="bg-primary text-white border-2 w-full"
        />
        {form.formState.errors.root && (
          <p className="w-full text-left text-red">
            {form.formState.errors.root.message}
          </p>
        )}
        <div className="flex flex-row  space-x-2">
          {/* CheckBox */}
          <div
            onClick={() => setIsTerms(!isTerms)}
            className={`${
              isTerms ? "border-primary  bg-primary-100" : "border-gray-400"
            } flex h-[24px] w-[24px] border-2 rounded-lg cursor-pointer`}
          >
            <Image
              alt="check"
              src={IconCheck}
              width={10}
              height={10}
              className={`${!isTerms && "hidden"} w-full h-full p-1`}
            />
          </div>

          <p className="text-gray-500">
            I agree to the <u>Terms and Conditions</u> of <u>Furniture</u> and
            acknowledge the
            <u>Privacy Policy</u>
          </p>
        </div>
        <p>
          Already have an account?
          <Link
            href="/sign-in"
            className="text-primary font-semibold hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
