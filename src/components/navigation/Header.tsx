"use client";
import React from "react";
import MyButton from "../Button";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserDropdown from "../UserDropdown";

import useCartCount from "@/hooks/useCartCount";

const elements: ElementNavigation[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Categories",
    href: "/categories",
  },
  {
    name: "Blog",
    href: "/shop",
  },
];

const Header = () => {
  const { data: session, status } = useSession();
  const cartCount = useCartCount();

  return (
    <header className="flex flex-row justify-between items-center py-3 md:py-4 md:px-20 px-4">
      <Image
        alt={"tafuco"}
        width={83}
        height={30}
        src="/icons/tafuco.svg"
        className="flex text-[#55575F]"
      />

      <div className="md:flex hidden flex-row space-x-[40px]">
        {elements.map((element, index) => (
          <a className="text-sm font-semibold" key={index} href={element.href}>
            {element.name}
          </a>
        ))}
      </div>
      <div className="md:flex hidden flex-row space-x-[24px] ">
        {!session?.user ? (
          <Link href="/sign-in">
            <MyButton
              disabled={status == "loading"}
              className="text-white"
              name="Sign In"
            />
          </Link>
        ) : (
          <>
            <Link
              href={"/cart"}
              className="flex relative rounded-full bg-secondary active:scale-95 justify-center items-center min-w-16 h-16"
            >
              <Image
                alt={"cart"}
                width={24}
                height={24}
                src="/icons/cart.svg"
                className="flex"
              />
              {cartCount > 0 && (
                <div className="absolute top-0 right-0 py-0.5 px-1.5 bg-red text-xs text-white text-center rounded-full">
                  {cartCount}
                </div>
              )}
            </Link>
            <UserDropdown
              email={String(session.user.email)}
              fullName={String(session.user.fullName)}
              images={session.user.image ?? undefined}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
