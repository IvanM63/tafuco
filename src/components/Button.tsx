"use client";
import React from "react";

import IconRightArrow from "/public/icons/icons_arrow_right.svg";

const MyButton = ({
  name,
  icon,
  onClick,
  className,
  disabled,
  children,
}: MyButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} min-w-[166px] h-[56px] space-x-3 flex flex-row bg-primary rounded-full 
        justify-center items-center text-center   transform transition-all disabled:bg-gray-400 disabled:cursor-wait`}
    >
      {name && <p className="font-semibold">{name}</p>}
      {icon && <IconRightArrow height={24} width={24} className="" />}
      {children}
    </button>
  );
};

export default MyButton;
