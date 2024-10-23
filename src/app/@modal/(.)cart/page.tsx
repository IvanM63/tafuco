"use client";
import MyButton from "@/components/Button";
import CartProductCard from "@/components/CartProductCard";
import CartItemSkeleton from "@/components/loading/CartItemSkeleton";
import { Modal } from "@/components/Modal";
import CartNotFound from "@/components/not-found/CartNotFound";
import { calculatePriceForCart } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

// TODO ADD NOTIF WHEN THERE ARE ITEMS IN CART

const InterceptCart = () => {
  const { data } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isQuantityLoading, setIsQuantityLoading] = useState(false);

  const [currentCartItems, setCurrentCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  if (!data?.user.id) redirect("/");
  const currentUserId = data?.user.id;

  useEffect(() => {
    getAllCartItems();
  }, []);

  const getAllCartItems = async () => {
    setLoading(true);
    const result = await fetch(`/api/users/${currentUserId}/cart`, {
      method: "GET",
    });
    const cartItems = await result.json();
    setCurrentCartItems(cartItems.items);
    setSubtotal(calculatePriceForCart(cartItems.items));
    setLoading(false);
  };

  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    setIsQuantityLoading(true);
    const result = await fetch(`/api/users/${currentUserId}/cart`, {
      method: "PATCH",
      body: JSON.stringify({ productId: cartItemId, quantity: newQuantity }),
    });

    if (result.ok) {
      const newCartItems = currentCartItems.map((item) =>
        item.productId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCurrentCartItems(newCartItems);
      setSubtotal(calculatePriceForCart(newCartItems));
    }
    setIsQuantityLoading(false);
  };

  // TODO add better ux when deleting item(s) in cart
  const handleDeleteItem = async (cartItemId: number) => {
    const result = await fetch(`/api/users/${currentUserId}/cart`, {
      method: "DELETE",
      body: JSON.stringify({
        id: cartItemId,
      }),
    });
    if (result.ok) await getAllCartItems();
    //TODO ADD TOASTER for notify user, they success del
  };

  const handleToCheckout = async () => {
    router.push("/checkout");
  };
  return (
    <Modal>
      <div className="flex flex-col mx-16 w-full space-y-4 mt-4 mb-16">
        {/* TOP  */}
        <div className="flex justify-center">
          <h1 className="py-4 font-bold text-xl">Cart</h1>
        </div>
        {loading
          ? !currentCartItems.length && (
              <>
                <CartItemSkeleton />
                <CartItemSkeleton />
              </>
            )
          : null}
        {/* EMPTY CART */}
        {!loading && currentCartItems.length === 0 && (
          <div className="flex justify-center items-center">
            <CartNotFound />
          </div>
        )}

        {/* CART ITEM CONTAINER */}
        <div className="flex flex-1 w-full flex-col space-y-12 overflow-y-auto ">
          {/* CART ITEM LIST */}
          {currentCartItems?.map((item, index) => (
            <CartProductCard
              key={index}
              onDelete={() => handleDeleteItem(item.id)}
              currentCartItems={item}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
          <div className="flex w-full flex-col space-y-12 overflow-y-auto"></div>
        </div>
        {currentCartItems.length !== 0 && (
          <div className="flex text-xl justify-between">
            <p className=" font-semibold">Subtotal</p>
            <p className="font-bold text-primary text-3xl">
              ${subtotal.toFixed(2)}
            </p>
          </div>
        )}
      </div>
      <MyButton
        disabled={isQuantityLoading || currentCartItems.length < 1}
        onClick={handleToCheckout}
        className="fixed left-0 bottom-0 flex w-full active:scale-100 active:bg-purple-900 rounded-none w- text-white"
        name="Next"
      />
    </Modal>
  );
};

export default InterceptCart;
