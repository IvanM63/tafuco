"use client";
import React from "react";
import Image from "next/image";
import MyButton from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { signInSchema } from "@/utils/z";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

const SignIn = () => {
  const { data, status } = useSession();

  if (status && data) redirect("/");

  //Using zod resolver
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "ivan2@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/",
    });
    // const result = await handleSignIn({
    //   email: values.email,
    //   password: values.password,
    // });
    // if (!result?.success) form.setError("root", { message: result?.message });
  };

  return (
    <div className="container justify-center items-center flex my-4 h-full w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mx-16 text-center w-1/2 h-full justify-center items-center space-y-4"
      >
        <h1 className="py-4 font-bold text-xl">Sign In</h1>
        <Image
          alt="sign-in"
          width={227}
          height={227}
          src="/assets/acc-home.png"
        />
        <h1 className="flex self-start text-2xl">Welcome Back</h1>
        <input
          {...form.register("email")}
          placeholder="email"
          className="flex outline-primary-400 rounded-2xl mb-1 py-3 px-4 w-full border-2"
          type="text"
        />
        {form.formState.errors.email && (
          <p className="w-full text-left text-red">
            {form.formState.errors.email.message}
          </p>
        )}
        <input
          {...form.register("password")}
          placeholder="password"
          className="flex outline-primary-400 rounded-2xl mb-1 py-3 px-4 w-full border-2"
          type="password"
        />
        {form.formState.errors.password && (
          <p className="w-full text-left text-red">
            {form.formState.errors.password.message}
          </p>
        )}
        <p className="self-end text-primary font-semibold hover:underline cursor-pointer">
          Forgot Password?
        </p>
        <MyButton
          disabled={form.formState.isSubmitting}
          name="Login"
          className="text-white w-full"
        />
        {form.formState.errors.root && (
          <p className="w-full text-left text-red">
            {form.formState.errors.root.message}
          </p>
        )}
        <p>Or</p>
        <MyButton
          onClick={() => signIn("google")}
          name="Google"
          className="bg-transparent border-2 w-full"
        />
        <p>
          First time here?
          <Link
            href="/sign-up"
            className="text-primary font-semibold hover:underline cursor-pointer"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
