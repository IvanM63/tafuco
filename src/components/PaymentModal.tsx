"use client";
import React from "react";
import { Modal } from "./Modal";
import MyButton from "./Button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { paymentSchema } from "@/utils/z";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

declare type PaymentModalProps = {
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuccesModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentModal = ({
  setShowPaymentModal,
  setShowSuccesModal,
}: PaymentModalProps) => {
  const { data, status } = useSession();
  if (status && !data?.user.id) redirect("/");

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expDate: "",
      cvv: "",
      name: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOrder = async (values: z.infer<typeof paymentSchema>) => {
    const result = await fetch(`/api/users/${data?.user.id}/order`, {
      method: "POST",
    });
    if (!result.ok) return;

    setShowSuccesModal(true);
    setShowPaymentModal(false);
  };

  return (
    <Modal>
      <div className="flex flex-col mx-16 w-full space-y-4 my-4 px-32  mb-16">
        {/* TOP  */}
        <div className="flex justify-center">
          <h1 className="py-4 font-bold text-xl">Payment</h1>
        </div>
        <div className="flex flex-1 w-full flex-col space-y-12 overflow-y-auto">
          <form className="flex flex-col space-y-4 w-full h-full">
            {/* TODO PUT THIS INTO REUSABLE COMPONENT */}
            {/* INPUT WITH ICON ON THE LEFT SIDE */}
            <div className="focus-within:border-primary-400 flex flex-row py-4 rounded-3xl mb-1 px-4 w-full border-2">
              <Image
                width={24}
                height={24}
                src="/icons/icons_mastercard.svg"
                alt="master"
                className="flex"
              />
              <input
                {...form.register("cardNumber")}
                placeholder="Card Number"
                type="number"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none px-4 w-full"
              />
            </div>
            {form.formState.errors.cardNumber && (
              <p className="text-red text-sm">
                {form.formState.errors.cardNumber.message}
              </p>
            )}
            {/* DOWN TWO ROW */}
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col">
                <input
                  {...form.register("expDate")}
                  placeholder="MM/YY"
                  type="text"
                  className="py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
                />
                {form.formState.errors.expDate && (
                  <p className="text-red text-sm">
                    {form.formState.errors.expDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  {...form.register("cvv")}
                  placeholder="CVV"
                  type="number"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
                />
                {form.formState.errors.cvv && (
                  <p className="text-red text-sm">
                    {form.formState.errors.cvv.message}
                  </p>
                )}
              </div>
            </div>
            <input
              {...form.register("name")}
              placeholder="Full Name"
              type="text"
              className="py-4 rounded-3xl flex outline-primary-400 mb-1 px-4 w-full border-2"
            />
            {form.formState.errors.name && (
              <p className="text-red text-sm -my-4">
                {form.formState.errors.name.message}
              </p>
            )}
            <div className="flex text-xl justify-between items-end flex-1">
              <p className=" font-semibold">Subtotal</p>
              <p className="font-bold text-primary text-3xl">$123</p>
            </div>
            <MyButton
              disabled={form.formState.isSubmitting}
              className="text-white rounded-none absolute left-0 bottom-0 w-full active:scale-100 active:bg-primary-900"
              onClick={form.handleSubmit(handleOrder)}
              name={
                form.formState.isSubmitting
                  ? "Purchasing..."
                  : "Proceed to payment"
              }
            />
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
