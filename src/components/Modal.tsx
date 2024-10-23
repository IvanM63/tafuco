"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setIsVisible(true);
  }, []);
  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 w-full h-screen transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`absolute right-0 p-2 border w-1/2 h-screen shadow-lg bg-white transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-row text-center h-full">
          {children}
          <div className="flex justify-center mt-4 h-full">
            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={router.back}
              className=" px-4 py-2 absolute left-10 bg-secondary  text-base font-medium rounded-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
