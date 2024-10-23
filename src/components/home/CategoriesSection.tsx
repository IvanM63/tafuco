import React from "react";
import HomeCategory from "./HomeCategory";

const homeCategories: HomeCategory[] = [
  {
    name: "Sitting Room",
    href: "",
    image: "/assets/sitting-room-full.png",
  },
  {
    name: "Accesories",
    href: "",
    image: "/assets/acc-home.png",
  },
  {
    name: "Kitchen",
    href: "/categories?categories=Kitchen",
    image: "/assets/kitchen-home.png",
  },
  {
    name: "Bedroom",
    href: "/categories?categories=Bedroom",
    image: "/assets/bedroom-home.png",
  },
];

const CategoriesSection = () => {
  return (
    <div className="space-y-8">
      {/* SECTION TITLE */}
      <h1 className="text-4xl font-semibold text-gray-800">Categories</h1>
      {/* HOME CATEGORIES */}
      <div className="grid grid-cols-2 gap-4">
        {homeCategories.map((category, index) => (
          <HomeCategory
            i={index}
            key={index}
            href={category.href}
            image={category.image}
            name={category.name}
            className={
              index != 1 && index != 2
                ? "col-span-2"
                : " col-span-2 md:col-span-1"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
