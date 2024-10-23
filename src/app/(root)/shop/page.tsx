import RouteBreadcrumb from "@/components/RouteBreadcrumb";
import React from "react";
import ProductCategorySelector from "@/components/ProductCategorySelector";
import TopProductSection from "@/components/home/TopProductSection";
import InputSearch from "@/components/InputSearch";

const ShopPage = () => {
  return (
    <main className="flex flex-col h-full w-full pt-20 md:px-20 px-4 space-y-20">
      {/* FIRST TEXT SECTION */}
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl font-bold">Browse our Catalogue</h1>
        <p className="md:text-lg md:px-20 text-gray-500">
          Transform your sitting room with our elegant and functional seating
          options, perfect for every modern home.
        </p>
        <RouteBreadcrumb
          array={[
            { name: "Homepage", href: "/" },
            { name: "Shop", href: "/shop" },
          ]}
        />
        {/* <InputSearch /> */}
      </div>
      {/* CATEGORIES SELECTION */}
      <ProductCategorySelector />
      {/* TOP PRODUCTS / SEARCHED PRODUCT */}
      <TopProductSection />
    </main>
  );
};

export default ShopPage;
