import React from "react";

declare type MyInputProps = {
  placeholder: string;
  type: string;
  className?: string;
};

const MyInput = ({ placeholder, type, className }: MyInputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={`${className} flex outline-primary-400 rounded-2xl mb-1 py-3 px-4 w-full border-2`}
      type={type}
    />
  );
};

export default MyInput;
