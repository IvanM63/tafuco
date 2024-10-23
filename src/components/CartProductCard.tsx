"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MyButton from "./Button";
import { Trash } from "iconsax-react";

const CartProductCard = ({
  currentCartItems,
  handleQuantityChange,
  onDelete,
}: CartItemCardProps) => {
  const [count, setCount] = useState(currentCartItems.quantity);
  const [selectedColor, setSelectedColor] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // For the debounce timer

  // Handle input change with debounce
  const handleCount = (newCount: number) => {
    setCount(newCount);

    if (Number.isNaN(newCount) || newCount <= 0) setCount(1);

    // Clear any existing timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set a new timer to delay the quantity change call
    timeoutRef.current = setTimeout(() => {
      handleQuantityChange(currentCartItems.productId, newCount);
    }, 1000); // 1-second delay
  };

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-row space-x-8 w-[528px] h-[185px]">
      {/* IMAGE SECTION LEFT SIDE */}
      <Image
        alt="product-1"
        src={currentCartItems.product.images[0] || "/default-image.jpg"}
        width={168}
        height={185}
        className="flex w-[168px] h-full bg-secondary rounded-md "
      />
      {/* RIGHT SIDE */}
      <div className="flex flex-col w-full h-full space-y-2">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[16px] text-start font-semibold">
            {currentCartItems.product.title}
          </h1>

          <p className="text-gray-600 line-clamp-2 text-start">
            {currentCartItems.product.desc}
          </p>
          {/* PRICE SECTION */}
          <div className="flex flex-row space-x-2">
            <p className="text-[20px] text-primary font-semibold">
              $
              {currentCartItems.product.discount === 0
                ? currentCartItems.product.price
                : currentCartItems.product.discount}
            </p>
            {currentCartItems.product.discount !== 0 ? (
              <p className="line-through text-gray-400">
                ${currentCartItems.product.price}
              </p>
            ) : null}
            {currentCartItems.product.discount !== 0 ? (
              <div className="text-red bg-rose-100 rounded-full px-2 py-1">
                -
                {Math.floor(
                  ((currentCartItems.product.discount ?? 0) /
                    (currentCartItems.product.price ?? 1)) *
                    100
                )}
                %
              </div>
            ) : null}
          </div>
        </div>
        {/* COLOR SELECTION */}
        <div className="flex flex-row items-center justify-between">
          {/* COLOR SELECTION */}
          <div className="flex flex-row space-x-1.5">
            {currentCartItems.product.colors.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(index)}
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
          <div className="flex flex-row justify-end items-center space-x-2">
            {/* DELETE THIS CART ITEM */}
            <MyButton
              onClick={onDelete}
              className="text-red bg-transparent hover:bg-rose-100 min-w-max px-4"
            >
              <Trash size="20" className="text-center" />
            </MyButton>
            {/* ITEM COUNT */}
            <input
              max={50}
              value={count}
              onChange={(event) => handleCount(parseInt(event.target.value))}
              type="number"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
              w-[54px] h-[40px] rounded-full bg-secondary border-2 p-1 text-[20px] font-semibold text-gray-500 flex text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
