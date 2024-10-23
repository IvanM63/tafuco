"use client";
import React, { useEffect, useRef, useState } from "react";

import ProductCard from "./ProductCard";
import ArrowRight from "/public/icons/icons_arrow_right.svg";
import ArrowLeft from "/public/icons/icons_arrow_left.svg";

const PeopleAlsoViewedSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  //TODO: add more logic so user can drag to scroll

  //Logic for scrolling when user clicked the arrow left or right
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
        });
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  return (
    <div className="flex flex-col h-full space-y-8">
      {/* TOP COL */}
      <div className="flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
        <h1 className="flex-1 text-3xl font-semibold text-gray-800 ">
          People Also Viewed
        </h1>
        {/* ARROW LEFT OR RIGHT BUTTON kinda */}
        <div className="flex flex-row space-x-4">
          <button
            onClick={scrollLeft}
            className="flex bg-secondary rounded-full w-11 h-11 justify-center items-center"
          >
            <ArrowLeft width={24} height={24} className="flex" />
          </button>
          <button
            onClick={scrollRight}
            className="flex bg-secondary rounded-full w-11 h-11 justify-center items-center"
          >
            <ArrowRight width={24} height={24} className="flex" />
          </button>
        </div>
      </div>
      {products.length > 0 ? (
        <>
          {/* MAIN CONTENT GRID */}
          <div
            ref={sliderRef}
            className="grid grid-rows-1 grid-flow-col gap-x-14 w-full h-full overflow-x-hidden overflow-y-clip py-4"
          >
            {products.map((product: ProductDetailProps, index: number) => (
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
        </>
      ) : (
        <p>Thera are no such product...</p>
      )}
    </div>
  );
};

export default PeopleAlsoViewedSection;
