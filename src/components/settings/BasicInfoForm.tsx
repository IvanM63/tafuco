"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { basicInfoSchema } from "@/utils/z";
import { useForm } from "react-hook-form";
import MyButton from "../Button";
import LineSkeleton from "../loading/LineSkeleton";

const infoProfileForm: BasicInfoForm[] = [
  {
    name: "fullName",
    placeholder: "Full Name",
  },
  {
    name: "username",
    placeholder: "Username",
  },
  {
    name: "email",
    placeholder: "Email",
  },
  {
    name: "gender",
    placeholder: "Gender",
  },
];

const BasicInfoForm = ({ userId }: { userId: string }) => {
  const containerRef = useRef<HTMLFormElement>(null);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formAddress = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      email: "",
      fullName: "",
      username: "",
      gender: "",
    },
  });

  //Get address from database and put it to form input
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const result = await fetch(`/api/users/${userId}`, {
        method: "GET",
      });
      const userData = await result.json();

      formAddress.reset({
        email: userData.email,
        fullName: userData.fullName,
        username: userData.username,
        gender: userData.gender,
      });
      setIsLoading(false);
    };
    getUser();
  }, [formAddress, userId]);

  const handleInfoSubmit = async (values: z.infer<typeof basicInfoSchema>) => {
    const result = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });

    // TODO if error occurs show toast
    // if (!result?.ok)
    setIsEditAddress(false);
  };

  //When isEdit true, when user click outside update button, it cancel out the form
  useEffect(() => {
    const handleMouseOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isEditAddress
      ) {
        setIsEditAddress(false);
        formAddress.resetField("fullName");
        formAddress.resetField("username");
        formAddress.resetField("gender");
      }
    };

    document.addEventListener("mousedown", handleMouseOutside);
    return () => {
      document.removeEventListener("mousedown", handleMouseOutside);
    };
  }, [formAddress, isEditAddress]);

  if (isLoading) return <LineSkeleton />;

  return (
    <form ref={containerRef} className="flex flex-col space-y-4">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl mb-4">Basic Information</h1>
        {!isEditAddress ? (
          <p
            onClick={() => setIsEditAddress(true)}
            className="text-primary font-semibold cursor-pointer hover:underline"
          >
            Edit
          </p>
        ) : (
          <MyButton
            disabled={formAddress.formState.isSubmitting}
            onClick={formAddress.handleSubmit(handleInfoSubmit)}
            name="Update"
            className="hover:bg-green-400 bg-green-500 text-white min-w-fit max-h-fit px-3 py-2 text-base"
          />
        )}
      </div>

      {/* INPUT SECTION */}
      {infoProfileForm.map((item, index) => (
        <div
          key={index}
          className={`${
            isEditAddress && item.name !== "email"
              ? "focus-within:border-primary-400 border-2 px-4 "
              : ""
          }flex flex-row py-4 rounded-3xl mb-1`}
        >
          <p className="flex w-1/5">{item.placeholder}:</p>
          <input
            disabled={!isEditAddress || item.name === "email"}
            {...formAddress.register(item.name)}
            placeholder={item.placeholder}
            type="text"
            className="flex disabled:bg-transparent outline-none px-4"
          />
        </div>
      ))}
    </form>
  );
};

export default BasicInfoForm;
