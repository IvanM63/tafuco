"use client";
import React, { useState } from "react";
import IconSearch from "/public/icons/icons_search.svg";

const InputSearch = ({ onSubmit, onChange, firstValue }: inputSearchProps) => {
  const [search, setSearch] = useState(firstValue ?? "");

  const handleOnSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <form
      onSubmit={handleOnSubmitSearch}
      className="focus-within:border-primary-400 group flex flex-row py-4 rounded-3xl mb-1 px-8 w-1/2 border-2"
    >
      <input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          onChange(event.target.value);
        }}
        placeholder="Search by name"
        type="text"
        className="outline-none  w-full"
      />
      <IconSearch
        width={24}
        height={24}
        className={`flex group group-focus-within:text-primary `}
      />
    </form>
  );
};

export default InputSearch;
