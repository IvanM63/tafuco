"use client";
import React, { useState } from "react";

const ProductCategories: string[] = [
  "All",
  "Bedroom",
  "Living Room",
  "Kitchen",
  "Workspace",
  "Outdoor",
  "Bathroom",
  "Home Office",
  "Dining",
];

type ProductCategorySelectorProps = {
  firstValue: string;
  onChange: (category: string) => void;
};

const ProductCategory = ({ selected, name, onClick }: ProductCategoryProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        selected === name ? "bg-primary text-white" : "bg-secondary"
      } min-w-fit rounded-full py-[18px] px-8 font-semibold hover:bg-primary-600 hover:text-white`}
    >
      {name}
    </button>
  );
};

const ProductCategorySelector = ({
  onChange,
  firstValue,
}: ProductCategorySelectorProps) => {
  const [selected, setSelected] = useState(firstValue ?? "All");

  const handleOnChange = async (cat: string) => {
    setSelected(cat);
    onChange(cat);
  };
  return (
    <div className="space-x-4 overflow-x-auto flex ">
      {ProductCategories.map((name: string, index: number) => (
        <ProductCategory
          onClick={() => handleOnChange(name)}
          key={index}
          name={name}
          selected={selected}
        />
      ))}
    </div>
  );
};

export default ProductCategorySelector;
