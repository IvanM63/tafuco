"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const sortByElements: SortByType[] = [
  "Most Recent",
  "Most Oldest",
  "Highest Price",
  "Lowest Price",
];

interface DropDownProps {
  onChange: (sort: SortByType) => void;
  firstValue: SortByType;
}

const DropDown = ({ onChange, firstValue }: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<SortByType>(firstValue ?? "Most Recent");
  const dropDownRef = useRef<HTMLDivElement>(null);

  //Close dropdown when user clicked outside dropdown
  useEffect(() => {
    const handleMouseOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseOutside);
    return () => {
      document.removeEventListener("mousedown", handleMouseOutside);
    };
  }, []);

  const handleOnChangeSortBy = async (value: SortByType) => {
    setSort(value);
    onChange(value);
  };

  return (
    <div
      ref={dropDownRef}
      className="flex flex-row w-full max-w-[218px] h-16 rounded-3xl border-2 border-gray-400 items-center justify-center
    space-x-12 cursor-pointer relative"
      onClick={() => setOpen(!open)}
    >
      <p>{sort}</p>
      <Image
        alt="arrow-down"
        width={24}
        height={24}
        src="/icons/icons_chevron_down.svg"
        className="flex "
      />

      <ul
        className={` overflow-hidden transition-all duration-500 ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } right-0 -left-12 list-none absolute top-20 rounded-md shadow-md text-center bg-white z-50`}
      >
        {sortByElements.map((item, index) => (
          <li
            onClick={() => handleOnChangeSortBy(item)}
            key={index}
            className="w-full p-2 hover:bg-gray-200 list-none"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
