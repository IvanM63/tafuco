import Image from "next/image";
import React from "react";

const CartNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 space-y-2">
      <Image src="/cart-empty.jpg" width={300} height={300} alt="cart" />
      <h1 className="text-3xl font-bold text-primary">Your Cart is Empty</h1>
      <p className="text-gray-500">
        Looks like you havent added anything to your cart yet
      </p>
    </div>
  );
};

export default CartNotFound;
