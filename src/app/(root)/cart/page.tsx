"use client";
import React, { useState } from "react";

const CartPage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex h-full w-full p-8 justify-center items-center">
      <div className="flex flex-row space-x-4 text-xl justify-center items-center">
        <button
          disabled={counter === 0}
          onClick={() => setCounter(counter - 1)}
          className="flex hover:bg-slate-100 p-1 px-3 rounded-full disabled:cursor-not-allowed"
        >
          -
        </button>
        <input
          value={counter}
          onChange={(e) => setCounter(parseInt(e.target.value))}
          placeholder="0"
          type="text"
        ></input>

        <button
          onClick={() => setCounter(counter + 1)}
          className="flex hover:bg-slate-100 p-1 px-3 rounded-full"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartPage;
