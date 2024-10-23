import React from "react";
import DropDown from "./DropDown";
import ProductCard from "./ProductCard";
import MyButton from "./Button";
import CardSkeleton from "./loading/CardSkeleton";
import ProductNotFound from "./not-found/ProductNotFound";

interface CustomSectionProps {
  title: string;
  products: Product[];
  onChangeDropDown: (sort: SortByType) => void;
  dropDownFirstValue: SortByType;
  loading: boolean;
}

const CustomSection = ({
  title,
  products,
  onChangeDropDown,
  dropDownFirstValue,
  loading,
}: CustomSectionProps) => {
  return (
    <div className="flex flex-col h-full space-y-8">
      {/* TOP COL */}
      <div className="flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
        <h1 className="flex-1 text-4xl font-semibold text-gray-800 ">
          {title}
        </h1>
        <DropDown onChange={onChangeDropDown} firstValue={dropDownFirstValue} />
      </div>
      {/* MAIN CONTENT GRID */}
      <div
        className={`${
          loading
            ? "grid grid-cols-auto grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 lg:gap-x-16 gap-y-8"
            : products.length > 0
            ? "grid grid-cols-auto grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 lg:gap-x-16 gap-y-8"
            : "flex"
        }
       w-full h-full justify-items-center`}
      >
        {loading ? (
          [...Array(8)].map((item, index) => <CardSkeleton key={index} />)
        ) : products.length > 0 ? (
          products.map((product: ProductDetailProps, index: number) => (
            <ProductCard
              id={product.id}
              key={index}
              image={product.images}
              name={product.title}
              price={product.price}
              colors={product.colors}
            />
          ))
        ) : (
          <ProductNotFound />
        )}
      </div>
      {/* TODO add this logic when admin available */}
      {/* BOTTOM SECTION */}
      {!loading && products.length > 0 ? (
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
      ) : null}
    </div>
  );
};

export default CustomSection;
