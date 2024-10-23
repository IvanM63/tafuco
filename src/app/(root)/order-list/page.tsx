"use client";
import LineSkeleton from "@/components/loading/LineSkeleton";
import OrderListCard from "@/components/order-list/OrderListCard";
import PaginationControl from "@/components/PaginationControl";
import { titleCase } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import React, { useEffect, useState } from "react";

const ordersStatus: OrderStatus[] = ["Active", "Cancelled", "Completed"];
type OrderStatus = "Active" | "Cancelled" | "Completed";

const OrderListPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const [filter, setFilter] = useState<OrderStatus>(
    titleCase(params.get("filter") ?? "Active") as OrderStatus
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(params.get("page") ?? "1")
  );
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  //Get Order From database
  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);
      const result = await fetch(
        `/api/users/${String(
          session?.user.id
        )}/order?page=${currentPage}&per_page=5&filter=${filter.toLocaleLowerCase()}`,
        { method: "GET" }
      );
      const newOrder = await result.json();
      setTotalPages(newOrder.totalPages);
      setOrders(newOrder.orders);
      setLoading(false);
    };
    if (status !== "loading") getOrder();
  }, [currentPage, filter, params, session?.user.id, status]);

  const handleOnChangeFilter = async (filter: OrderStatus) => {
    router.push(
      `/order-list?page=1&per_page=5&filter=${filter.toLocaleLowerCase()}`
    );
    setFilter(filter);
    setCurrentPage(1);
    setOrders([]);
  };

  const handleOnChangePage = async (currentPage: number) => {
    setCurrentPage(currentPage);
    router.push(
      `/order-list?page=${currentPage}&per_page=5&filter=${filter.toLocaleLowerCase()}`
    );
    setOrders([]);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col w-full px-10 md:px-20 py-4 gap-8">
        <div className="text-2xl font-bold">My Orders</div>

        {/* SHIPPING STATUS TAB */}
        <div className="flex flex-row">
          {ordersStatus.map((status, index) => (
            <div
              key={index}
              onClick={() => handleOnChangeFilter(status)}
              className={`${
                status === filter && "border-black text-tertiary-black"
              }  cursor-pointer text-lg italic border-b-2 px-8 py-2 text-gray-400 `}
            >
              {status}
            </div>
          ))}
        </div>
        {/* ORDER LIST ALL */}
        {loading && <LineSkeleton />}
        {loading && <LineSkeleton />}
        {!orders ? (
          <div> There are no order</div>
        ) : (
          orders.map((item, index) => (
            // ORDER LIST CARD
            <OrderListCard key={index} order={item} />
          ))
        )}

        {/* PAGINATION CONTROL */}
        <PaginationControl
          totalPage={totalPages}
          currentPage={currentPage}
          handlePageChange={handleOnChangePage}
        />
      </div>
    </Suspense>
  );
};

export default OrderListPage;
