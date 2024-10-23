import React from "react";

const ProductNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
      <h1 className="text-primary text-9xl font-bold">404</h1>
      <h2 className="font-bold text-4xl">Product not found.</h2>
      <p className="text-gray-500">
        Sorry we cant find that product you desire. You will find lots products
        on another category
      </p>
    </div>
  );
};

export default ProductNotFound;
