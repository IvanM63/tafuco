"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { shippingSchema } from "@/utils/z";
import { useForm } from "react-hook-form";
import MyButton from "../Button";
import LineSkeleton from "../loading/LineSkeleton";

const addressProfileForm: InputForm[] = [
  {
    name: "firstName",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
  },
  {
    name: "phone",
    placeholder: "Phone Number",
  },
  {
    name: "address",
    placeholder: "Address",
  },
  {
    name: "city",
    placeholder: "City",
  },
  {
    name: "country",
    placeholder: "Country",
  },
];

const AddressForm = ({ userId }: { userId: string }) => {
  const containerRef = useRef<HTMLFormElement>(null);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formAddress = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      country: "",
    },
  });

  //Get address from database and put it to form input
  useEffect(() => {
    const getAddress = async () => {
      setIsLoading(true);
      const result = await fetch(`/api/users/${userId}/address`, {
        method: "GET",
      });
      const addressData = await result.json();

      formAddress.reset(addressData[0]);
      setIsLoading(false);
    };
    getAddress();
  }, [formAddress, userId]);

  const handleAddressSubmit = async (
    values: z.infer<typeof shippingSchema>
  ) => {
    await fetch(`/api/users/${userId}/address`, {
      method: "POST",
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
        formAddress.resetField("address");
        formAddress.resetField("city");
        formAddress.resetField("country");
        formAddress.resetField("firstName");
        formAddress.resetField("lastName");
        formAddress.resetField("phone");
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
        <h1 className="font-bold text-xl mb-4">Address Detail</h1>
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
            onClick={formAddress.handleSubmit(handleAddressSubmit)}
            name="Update"
            className="hover:bg-green-400 bg-green-500 text-white min-w-fit max-h-fit px-3 py-2 text-base"
          />
        )}
      </div>

      {/* INPUT SECTION */}
      {addressProfileForm.map((item, index) => (
        <div
          key={index}
          className={`${
            isEditAddress
              ? "focus-within:border-primary-400 border-2 px-4 "
              : ""
          }flex flex-row py-4 rounded-3xl mb-1`}
        >
          <p className="flex w-1/5">{item.placeholder}:</p>
          <input
            disabled={!isEditAddress}
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

export default AddressForm;
