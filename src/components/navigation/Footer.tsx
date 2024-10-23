import React from "react";

import Tafuco from "/public/icons/tafuco.svg";

import ArrowUp from "/public/icons/icons_arrow_up.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col bg-black w-full h-[805px] md:h-[410px] text-white p-20 justify-between">
      {/* FIRST SECTION */}
      <div className="flex flex-col justify-between">
        <Tafuco width={83} height={30} className="text-white" />
        <ul className="grid grid-cols-6 justify-items-center">
          <li className="justify-self-start">Home</li>
          <li className="text-gray-400">/</li>
          <li>Blog</li>
          <li className="text-gray-400">/</li>
          <li>Sale</li>
          <li className="text-gray-400">/</li>
          <li className="col-span-2 justify-self-start">About Us</li>
          <li className="text-gray-400">/</li>
        </ul>
      </div>
      {/* SECOND SECTION */}
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full justify-end space-y-2">
          <p className="text-xs text-gray-400">Contact Us</p>
          <p className="text-xl">+1 999 888-76-54</p>
        </div>
        <div className="flex flex-col h-full justify-end space-y-2">
          <p className="text-xs text-gray-400">Email</p>
          <p className="text-xl">hello@logoipsum.com</p>
        </div>
      </div>
      {/* THIRD SECTION */}
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full justify-end space-y-2">
          <p className="text-[10px] text-gray-400">ADDRESS</p>
          <p className="text-sm">
            2118 Thornridge Cir. Syracuse, Connecticut 35624
          </p>
        </div>
        <div className="flex flex-col h-full justify-end space-y-2">
          <p className="text-[10px] text-gray-400">OPENING HOURS</p>
          <p className="text-xl">9am—6pm</p>
        </div>
      </div>
      {/* FOURTH SECTION */}
      <div className="flex flex-col h-full">
        <div className="flex h-full justify-end">
          <Link href="#">
            <button className="flex rounded-full bg-secondary active:scale-95 justify-center items-center min-w-16 h-16">
              <ArrowUp width={24} height={24} className="flex" />
            </button>
          </Link>
        </div>

        <p className="flex h-full text-[13px] text-gray-400 justify-end items-end">
          © 2024 — Copyright
        </p>
      </div>
    </div>
  );
};

export default Footer;
