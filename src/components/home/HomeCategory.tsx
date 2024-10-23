import React from "react";
import MyButton from "../Button";
import Link from "next/link";
import Image from "next/image";

const HomeCategory = ({ name, image, href, className, i }: HomeCategory) => {
  //const small = i != 1 && i != 2 ? "md:px-20" : "";
  return (
    <Link
      href={href}
      className={`${className} flex flex-row col-span-2 h-[173px] md:h-[453px] w-full bg-[#F3F4F7] rounded-sm justify-between px-8 py-2 cursor-pointer`}
    >
      <div
        className={`${
          i != 1 && i != 2 ? "md:px-20" : ""
        } flex flex-col justify-center items-start space-y-7 
            min-w-max`}
      >
        <h1 className="flex md:text-4xl text-xl font-semibold text-gray-800 w-full">
          {name}
        </h1>
        <MyButton
          className="md:flex hidden bg-transparent text-gray-800 border border-gray-800"
          name="Shop Now"
          icon="/icons/icons_arrow_right.svg"
        />
      </div>
      <Image
        alt="categories-home"
        width={900}
        height={536}
        src={image}
        className="flex w-auto hover:scale-125 transform transition-all duration-500 "
      />
    </Link>
  );
};

export default HomeCategory;
