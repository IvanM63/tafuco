"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { signOut } from "next-auth/react";

const UserDropdown = ({ email, fullName, images }: UserDropDownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="flex relative">
      {/* Avatar */}
      <button
        className="group flex flex-row bg-primary rounded-full items-center px-5 space-x-2"
        onClick={() => setOpen(!open)}
      >
        <Image
          alt="avatar"
          src={images ? images : "https://avatar.iran.liara.run/public"}
          width={36}
          height={36}
          className="flex rounded-full active:scale-90 transition-transform transform"
        />
        <p className=" text-white font-semibold overflow-x-hidden line-clamp-">
          Profile
        </p>
      </button>
      <div
        id="dropdownAvatar"
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-max opacity-100" : "max-h-0 opacity-0"
        }  absolute top-20 right-0 bg-white divide-y divide-gray-100 rounded-3xl
            shadow w-80 dark:bg-gray-700 dark:divide-gray-600 z-10`}
      >
        <div className="flex row space-x-4 px-4 py-3 text-sm  w-full">
          <Image
            alt="avatar"
            src={images ? images : "https://avatar.iran.liara.run/public"}
            width={40}
            height={40}
            className="flex rounded-full "
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-base">{fullName}</h1>
            <p className="font-normal text-sm text-gray-400">{email}</p>
          </div>
        </div>
        <ul
          className="text-sm text-gray-700 dark:text-gray-200 list-none m-0"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <a
              href="/order-list"
              className="block px-4 py-4 hover:bg-primary-50 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Order
            </a>
          </li>
          <li>
            <a
              href="/user/settings"
              className="block px-4 py-4 hover:bg-primary-50 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
        </ul>
        <button
          onClick={() => signOut()}
          className="hover:bg-rose-100 py-2 bg-red-500 rounded-b-md hover:bg-red-600 group-active:bg-red-700 w-full "
        >
          <p className="text-center block px-4 py-2 text-sm font-semibold text-red active:scale-90">
            Sign out
          </p>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
