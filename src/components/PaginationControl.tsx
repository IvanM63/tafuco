import React from "react";

type PaginationControlProps = {
  totalPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

const PaginationControl = ({
  totalPage,
  currentPage,
  handlePageChange,
}: PaginationControlProps) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${
              currentPage === 1
                ? "cursor-not-allowed text-gray-100 border-gray-50"
                : "hover:bg-gray-100 hover:text-gray-700 "
            } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 
            bg-white border border-e-0 border-gray-300 rounded-s-lg 
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {/* LIST OF PAGE */}
        {[...Array(totalPage)].map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              }
                 flex items-center justify-center px-3 h-8 leading-tight 
                 border border-gray-300  dark:bg-gray-800 
                dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        {/* NEXT PAGE */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`${
              currentPage === totalPage
                ? "cursor-not-allowed text-gray-100 border-gray-50 border-l-gray-300"
                : "hover:bg-gray-100 hover:text-gray-700 "
            } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 
          bg-white border border-gray-300 rounded-e-lg 
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationControl;
