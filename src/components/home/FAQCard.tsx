"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FAQCard = ({ title, desc, index }: FAQSection) => {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropDownRef}
      className="flex flex-row py-8 space-x-4 md:space-x-16 border-b-[1px] border-[#D9D9D9]"
    >
      {/* INDEX */}
      <h2 className="flex text-2xl">0{index! + 1}</h2>
      {/* QUESTION & ANSWER */}
      <div className="flex flex-1 flex-col space-y-6">
        <h2 className="text-2xl">{title}</h2>
        <p
          className={`text-lg text-gray-400 overflow-hidden transition-all duration-500 ${
            open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {desc}
        </p>
      </div>
      {/* ARROW */}
      <button
        onClick={() => setOpen(!open)}
        className="flex rounded-full bg-secondary active:scale-95 justify-center items-center min-w-16 h-16"
      >
        <Image
          alt={"cart"}
          width={24}
          height={24}
          src="/icons/icons_arrow_up.svg"
          className={`flex ${
            open && "rotate-180"
          } transition transform ease-in`}
        />
      </button>
    </div>
  );
};

export default FAQCard;
