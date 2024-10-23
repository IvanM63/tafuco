import React from "react";
import Image from "next/image";

import CategoriesSection from "@/components/home/CategoriesSection";
import TopProductSection from "@/components/home/TopProductSection";
import DesignInspirationSection from "@/components/home/DesignInspirationSection";
import FAQSection from "@/components/home/FAQSection";

const Home = () => {
  return (
    <main className="flex flex-col h-full w-full pt-20 md:px-20 px-4">
      {/* FIRST TEXT SECTION */}
      <div className="flex flex-col items-center text-center space-y-6">
        <h2 className="text-lg font-semibold">FURNITURE STORE</h2>
        <h1 className="md:text-7xl text-4xl font-semibold md:font-bold leading-snug text-gray-800">
          Discover the Artistry of Modern Contemporary Furniture
        </h1>
        <p className="md:text-xl md:px-20">
          Experience the elegance and functionality of cutting-edge design where
          luxury meets innovation in every piece for ultimate relaxation
        </p>
      </div>
      {/* SECOND IMAGE SECTION */}
      <Image
        alt="sofa"
        width={1280}
        height={500}
        src="/assets/sofa-home.png"
        className="flex w-full mt-6"
      />
      {/* DIVIDER */}
      <div className="mt-24 " />
      {/* THIRD CATEGORIES SECTION */}
      <CategoriesSection />
      {/* DIVIDER */}
      <div className="mt-24 " />
      {/* TOP PRODUCT SECTION */}
      <TopProductSection />
      {/* DIVIDER */}
      <div className="mt-24 " />
      {/* DESIGN INSPIRATION SECTION */}
      <DesignInspirationSection />
      {/* DIVIDER */}
      <div className="mt-24 " />
      {/* FAQ SECTION */}
      <FAQSection />
      {/* DIVIDER */}
      <div className="mt-24 " />
    </main>
  );
};

export default Home;
