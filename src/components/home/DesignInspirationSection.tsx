import React from "react";
import MyButton from "../Button";
import Image from "next/image";
import ProductCategorySelector from "../ProductCategorySelector";
import { designInspirations } from "@/utils/fakedatabase";

const DesignInspirationSection = () => {
  return (
    <div className="flex flex-col h-full space-y-8">
      <h1 className="text-4xl font-semibold text-gray-800">
        Design inspiration and modern home ideas
      </h1>
      <ProductCategorySelector />
      {/* DESIGN INSPIRATION GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {designInspirations.map((design, index) => (
          <div
            key={index}
            className={`${
              index === 1 ? "row-span-3 h-[486px]" : "row-span-4 h-full"
            } hover:scale-110 cursor-pointer transition-transform`}
          >
            <Image
              alt="design"
              src={design.image}
              width={410}
              height={607}
              className="w-full h-full rounded-md"
            />
          </div>
        ))}
      </div>
      {/* BOTTOM SECTION */}
      <div className="flex flex-col justify-center items-center space-y-8">
        <p className="flex text-sm text-gray-600">Showing 9 of 48 results</p>
        {/* PROGRESS BAR */}
        <div className="h-1 w-1/2 bg-gray-200">
          <div
            className={` h-1 bg-gray-800`}
            style={{ width: `${(9 / 48) * 100}%` }}
          />
        </div>
        <MyButton
          className="bg-transparent text-gray-800 border-2 border-gray-400"
          name="Show More"
        />
      </div>
    </div>
  );
};

export default DesignInspirationSection;
