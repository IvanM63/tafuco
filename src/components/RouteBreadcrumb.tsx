import React from "react";
import ArrowRightChevron from "/public/icons/icons_chevron_right.svg";

type RouteBreadcrumbProps = {
  array: { name: string; href: string }[];
};

const RouteBreadcrumb = ({ array }: RouteBreadcrumbProps) => {
  return (
    <ul className="flex flex-row items-center text-xs text-gray-500 space-x-2">
      {array.map((item, index) => (
        <React.Fragment key={index}>
          <li
            className={`${
              array.length - 1 === index
                ? "text-tertiary-black"
                : "text-gray-500"
            } hover:underline`}
          >
            <a href={item.href}>{item.name}</a>
          </li>
          {array.length - 1 !== index && (
            <li className="text-gray-400">
              <ArrowRightChevron width={12} height={12} />
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default RouteBreadcrumb;
