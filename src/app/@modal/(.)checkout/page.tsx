"use client";
import { Modal } from "@/components/Modal";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { shippingSchema } from "@/utils/z";
import MyButton from "@/components/Button";
import PaymentModal from "@/components/PaymentModal";
import SuccessModal from "@/components/modal/SuccessModal";
import Image from "next/image";
import { useSession } from "next-auth/react";

const InterceptCheckoutPage = () => {
  const { data } = useSession();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const form = useForm<z.infer<typeof shippingSchema>>({
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

  //TODO PASS VALUE TO PAYMENT MODAL
  const handleToPayment = async (values: z.infer<typeof shippingSchema>) => {
    setShowPaymentModal(true);
  };

  const handleAddAddressFromProfile = async () => {
    try {
      const result = await fetch(`/api/users/${data?.user.id}/address`, {
        method: "GET",
      });
      const address = await result.json();
      console.log(address);

      form.setValue("firstName", address[0].firstName);
      form.setValue("lastName", address[0].lastName);
      form.setValue("phone", address[0].phone);
      form.setValue("address", address[0].address);
      form.setValue("city", address[0].city);
      form.setValue("country", address[0].country);
    } catch (error) {
      console.log(error);
    }
  };

  if (showPaymentModal)
    return (
      <PaymentModal
        setShowPaymentModal={setShowPaymentModal}
        setShowSuccesModal={setShowSuccessModal}
      />
    );

  if (showSuccessModal) return <SuccessModal />;
  return (
    <Modal>
      <div className="flex flex-col w-full space-y-4 my-4 px-48  mb-16">
        {/* TOP  */}
        <div className="flex justify-center">
          <h1 className="py-4 font-bold text-xl">CheckOut</h1>
        </div>
        <div className="flex flex-1 w-full flex-col space-y-6 overflow-y-auto">
          {/* CUSTOMER INFORMATION */}
          <div className="flex flex-col items-center space-y-2">
            <h2 className="font-semibold text-xl self-start text-gray-500">
              Customer Information
            </h2>
            {/* Profile Card */}
            <div
              className="flex flex-row bg-primary text-white space-x-4 px-4 py-3 text-sm w-full rounded-2xl shadow-lg  
            hover:shadow-inner  hover:cursor-pointer group transition-all duration-200 "
            >
              <Image
                alt="avatar"
                src={
                  data?.user.image
                    ? data?.user.image
                    : "https://avatar.iran.liara.run/public"
                }
                width={40}
                height={40}
                className="flex rounded-full "
              />
              <div className="flex flex-col w-full items-start">
                <h1 className="font-bold text-base">{data?.user.fullName}</h1>
                <p className="font-normal text-sm text-gray-100 ">
                  {data?.user.email}
                </p>
              </div>
            </div>
          </div>
          {/* SHIPPING ADDRESS */}
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-semibold text-xl text-start text-gray-500">
              Shipping Address
            </h2>
            <button
              onClick={handleAddAddressFromProfile}
              className="text-xs text-primary font-semibold cursor-pointer hover:underline"
            >
              + Add from profile
            </button>
          </div>
          <form className="flex flex-col space-y-4 w-full">
            <input
              {...form.register("firstName")}
              placeholder="First Name"
              type="text"
              className="py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
            />
            {form.formState.errors.firstName && (
              <p className="text-red text-sm">
                {form.formState.errors.firstName.message}
              </p>
            )}
            <input
              {...form.register("lastName")}
              placeholder="Last Name"
              type="text"
              className="py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
            />
            {form.formState.errors.lastName && (
              <p className="text-red text-sm">
                {form.formState.errors.lastName.message}
              </p>
            )}
            <input
              {...form.register("phone")}
              placeholder="+62"
              type="text"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
            />
            {form.formState.errors.phone && (
              <p className="text-red text-sm">
                {form.formState.errors.phone.message}
              </p>
            )}
            <input
              {...form.register("address")}
              placeholder="Address"
              type="text"
              className="py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
            />
            {form.formState.errors.address && (
              <p className="text-red text-sm -my-4">
                {form.formState.errors.address.message}
              </p>
            )}
            {/* DOWN TWO ROW */}
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col">
                <input
                  {...form.register("city")}
                  placeholder="City"
                  type="text"
                  className="py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
                />
                {form.formState.errors.city && (
                  <p className="text-red text-sm">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  {...form.register("country")}
                  placeholder="Country"
                  type="text"
                  className="py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
                />
                {form.formState.errors.country && (
                  <p className="text-red text-sm">
                    {form.formState.errors.country.message}
                  </p>
                )}
              </div>
            </div>
            <MyButton
              className="text-white rounded-none absolute left-0 bottom-0 w-full active:scale-100 active:bg-primary-900"
              onClick={form.handleSubmit(handleToPayment)}
              name="Proceed to payment"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default InterceptCheckoutPage;
