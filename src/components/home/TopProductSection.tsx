"use client";
import React, { useEffect, useState } from "react";
import DropDown from "../DropDown";
import ProductCard from "../ProductCard";
import MyButton from "../Button";
import CardSkeleton from "../loading/CardSkeleton";

const TopProductSection = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortByType>("Most Recent");
  const [loading, setLoading] = useState<boolean>(false);

  const getAllTopProduct = async (sort: SortByType) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?sort_by=${sort}`, {
        method: "GET",
      });
      const result = await response.json();
      setTopProducts(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTopProduct(sort);
  }, [sort]);

  const handleSortOnChange = async (sort: SortByType) => {
    setSort(sort);
    getAllTopProduct(sort);
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      {/* TOP COL */}
      <div className="flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
        <h1 className="flex-1 text-4xl font-semibold text-gray-800 ">
          Top Products
        </h1>
        <DropDown firstValue={sort} onChange={handleSortOnChange} />
      </div>
      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-auto grid-cols-2 justify-items-center md:grid-cols-4 gap-x-6 md:gap-x-12 lg:gap-x-16 gap-y-8 w-full h-full ">
        {loading
          ? [...Array(8)].map((item, index) => <CardSkeleton key={index} />)
          : topProducts.map((product: ProductDetailProps, index: number) => (
              <ProductCard
                id={product.id}
                key={index}
                image={product.images}
                name={product.title}
                price={product.price}
                colors={product.colors}
              />
            ))}
      </div>
      {/* BOTTOM SECTION */}
      <div className="flex flex-col justify-center items-center space-y-8">
        <p className="flex text-sm text-gray-600">Showing 12 of 48 results</p>
        {/* PROGRESS BAR */}
        <div className="h-1 w-1/2 bg-gray-200">
          <div
            className={` h-1 bg-gray-800`}
            style={{ width: `${(12 / 48) * 100}%` }}
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

export default TopProductSection;
