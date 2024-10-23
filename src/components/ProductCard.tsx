"use client";
import React, { useState } from "react";
import Image from "next/image";
import MyButton from "./Button";
import Link from "next/link";

const ProductCard = ({ name, image, colors, price, id }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <Link
      href={`/products/${id}`}
      className="group flex flex-col bg-white h-full w-full max-w-[296px] max-h-[383px] rounded-md 
     cursor-pointer space-y-1 hover:scale-105 transition transform ease-in"
    >
      <Image
        src={image[0]}
        alt="product"
        width={300}
        height={313}
        className="bg-[#F3F4F7] rounded-t-md h-full w-full"
      />
      <MyButton
        className="hover:bg-primary-950 absolute bottom-24 left-6 duration-200 fill-white text-white overflow-hidden opacity-0 md:group-hover:opacity-100"
        name="Add to cart"
        icon="/icons/icons_arrow_right.svg"
      />
      <div className=" flex flex-row items-center space-x-6 w-full">
        <p className="w-96 inline-block text-lg font-semibold truncate cursor-text ">
          {name}
        </p>
        <p className="flex bg-secondary rounded-full text-lg font-semibold px-3 py-2">
          ${price}
        </p>
      </div>

      {/* COLOR SELECT */}
      <div className="flex flex-row space-x-1.5">
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelectedColor(index);
            }}
            className={`hover:border-gray-400 border-2 border-white  w-6 h-6 p-[1px] rounded-full mb-[1px] `}
            style={{
              borderColor: index === selectedColor ? "#5F6980" : "",
            }}
          >
            <div
              className={`w-full h-full  rounded-full `}
              style={{ backgroundColor: color }}
            ></div>
          </div>
        ))}
      </div>
    </Link>
  );
};

export default ProductCard;
