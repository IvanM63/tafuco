import { redirect } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
  redirect("/cart");
  return <></>;
};

export default CheckoutPage;
