"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import AddressForm from "@/components/settings/AddressForm";
import LineSkeleton from "@/components/loading/LineSkeleton";
import BasicInfoForm from "@/components/settings/BasicInfoForm";

const UserSettingsPage = () => {
  const { data: session, status } = useSession();

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 min-h-56 w-full px-10 md:px-20 py-4 gap-8">
      {/* LEFT SECTION */}
      <div className="flex flex-col p-12 rounded-xl shadow-md border-[1px] border-gray-100 space-y-6">
        <div className="flex ">
          <Image
            alt="avatar"
            width={250}
            height={250}
            src={
              session?.user.image
                ? session?.user.image
                : "https://avatar.iran.liara.run/public"
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-2xl">{session?.user.fullName}</h1>
          <h2 className="font-semibold">Buyer</h2>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="">Status</h1>
          <h2 className="font-semibold">Active</h2>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="">Email</h1>
          <h2 className="font-semibold text-primary">{session?.user.email}</h2>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col lg:col-span-3 md:col-span-2 w-full h-full space-y-4">
        {/* MAIN ITEM */}
        {/* BASIC INFORMATION FORM */}
        <div
          className="flex flex-col w-full  h-full shadow-md rounded-xl border-[1px] border-gray-100 
        px-10 py-8 "
        >
          {status !== "loading" ? (
            <BasicInfoForm userId={String(session?.user.id)} />
          ) : (
            <LineSkeleton />
          )}
        </div>
        {/* ADDRESS DETAIL FORM */}
        <div
          className="flex flex-col w-full  h-full shadow-md rounded-xl border-[1px] border-gray-100 
        px-10 py-8 "
        >
          {status !== "loading" ? (
            <AddressForm userId={String(session?.user.id)} />
          ) : (
            <LineSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
