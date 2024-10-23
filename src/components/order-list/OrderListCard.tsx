"use client";

import Image from "next/image";
import React, { useState } from "react";
import MyButton from "../Button";
import { calculatePriceForOrder, formatDate, titleCase } from "@/utils/utils";

type OrderItemProps = {
  showButton: boolean;
  orderItem: OrderItem;
};

const OrderItemCard = ({ orderItem, showButton }: OrderItemProps) => {
  return (
    <div className="flex flex-row space-x-4 from animate-fadeIn">
      <Image
        className="bg-secondary rounded-lg"
        width={110}
        height={110}
        alt="product"
        src={orderItem.product.images[0]}
      />
      <div className="flex flex-col justify-center w-full">
        <h1 className="flex font-semibold text-lg">
          {orderItem.product.title}
        </h1>
        {/* COLOUR */}
        <span className="flex  font-semibold">
          Colour: <p className="flex ml-2 text-gray-400 font-normal">White</p>
        </span>
        {/* QUANTITY */}
        <div className="flex  font-semibold">
          Qty:{" "}
          <p className="flex ml-2 text-gray-400 font-normal">
            {orderItem.quantity}
          </p>
        </div>
        {/* TOTAL */}
        <span className="flex  font-semibold">
          Total:{" "}
          <p className="flex ml-2 text-gray-400 font-normal">
            ${orderItem.quantity * orderItem.price}
          </p>
        </span>
      </div>
      {showButton && <MyButton className="text-white" name="View Detail" />}
    </div>
  );
};

const OrderListCard = ({ order }: OrderProps) => {
  const [showMoreItems, setShowMoreItems] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      {/* ORDER INFORMATION */}
      <div className="flex flex-col border-2 rounded-lg px-8 py-6 space-y-3">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-bold flex">Order no: #{order.id}</h1>
          <div
            className={`flex text-white rounded-full items-center px-4 py-2 font-semibold ${
              order.status === "PENDING" || order.status === "SHIPPED"
                ? "bg-yellow-500"
                : order.status === "DELIVERED"
                ? "bg-green-500"
                : "bg-red"
            }`}
          >
            {titleCase(order.status)}
          </div>
        </div>
        <div className="flex flex-col space-y-0.5">
          <div className="flex text-gray-500 font-bold">
            Order Date:{" "}
            <p className="flex ml-2 text-gray-400 font-normal">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex text-gray-500 font-bold">
            Estimated Delivery Date:{" "}
            <p className="flex flex-1 ml-2 text-gray-400 font-normal">
              8 June 2023
            </p>
            <p className="flex text-end justify-end items-end text-black ">
              Total: ${calculatePriceForOrder(order.items)}
            </p>
          </div>
        </div>
      </div>
      {/* PRODUCTS IN ORDER */}
      {/* ALways shows the first product */}
      <OrderItemCard orderItem={order.items[0]} showButton={true} />

      {showMoreItems &&
        order.items
          .slice(1)
          .map((orderItem, index) => (
            <OrderItemCard
              key={orderItem.id}
              orderItem={orderItem}
              showButton={index === 1}
            />
          ))}
      {order.items.length > 1 && (
        <button
          onClick={() => setShowMoreItems(!showMoreItems)}
          className="bg-transparent italic font-normal text-gray-500 flex flex-row bg-primary rounded-full 
        justify-center items-center text-center"
        >
          {!showMoreItems ? "Click for more..." : "Close"}
        </button>
      )}

      {/* DIVIDER */}
      <div className="h-[2px] w-full bg-gray-200 rounded-3xl" />
    </div>
  );
};

export default OrderListCard;
