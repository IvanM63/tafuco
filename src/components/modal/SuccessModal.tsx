"use client";
import React from "react";
import { Modal } from "../Modal";
import Image from "next/image";
import MyButton from "../Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SuccessModal = () => {
  const router = useRouter();
  return (
    <Modal>
      <div className="flex flex-col mx-16 w-full my-4 px-20 items-center justify-center mb-16 space-y-20">
        {/* TOP  */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <Image
            width={227}
            height={227}
            alt="squircle"
            src="/assets/Squircle.png"
          />
          <h1 className="font-semibold text-2xl">Your Order is Confirmed!</h1>
          <p className="text-gray-500">
            Thank you for shopping with us! Your beautiful new furniture is on
            its way and will be with you soon. Get ready to transform your
            space!
          </p>
        </div>
        <Link
          href="/"
          className="flex flex-1 w-full flex-col space-y-12 overflow-y-auto max-h-min"
        >
          <MyButton
            onClick={() => {
              router.back();
              router.back();
            }}
            name="Done"
            className="text-white active:bg-primary-900"
          />
        </Link>
      </div>
    </Modal>
  );
};

export default SuccessModal;
