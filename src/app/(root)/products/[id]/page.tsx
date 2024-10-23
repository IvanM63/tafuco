"use client";
import MyButton from "@/components/Button";
import { getProduct } from "@/utils/actions/product.action";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Box from "/public/icons/Box.svg";
import Leaf from "/public/icons/Leaf.svg";

import { useSession } from "next-auth/react";
import LineSkeleton from "@/components/loading/LineSkeleton";
import RouteBreadcrumb from "@/components/RouteBreadcrumb";
import PeopleAlsoViewedSection from "@/components/PeopleAlsoViewed";
import Rating from "@/components/Rating";

const ProductPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [productData, setProductData] = useState<ProductDetailProps>();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setPageLoading(true);
      setProductData(await getProduct({ id: id as string }));
      setPageLoading(false);
    };
    fetchProductData();
  }, [id]);

  const handleAddToCart = async () => {
    setLoading(true);
    if (!data) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }

    const result = await fetch(`/api/users/${data?.user.id}/cart`, {
      method: "POST",
      body: JSON.stringify({ productId: id as string, quantity: count }),
    });

    if (result.ok) router.push("/cart");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full pt-20 md:px-20 px-4 space-y-8 mb-20">
      {/* BREADCRUMBs */}
      <RouteBreadcrumb
        array={[
          { name: "Homepage", href: "/" },
          { name: "Categories", href: "/categories" },
          {
            name: productData?.category ?? "Unknown Category",
            href: `/categories?categories=${productData?.category}`,
          },
          {
            name: productData?.title ?? "",
            href: `/products/${productData?.id}`,
          },
        ]}
      />
      <div className="flex flex-row space-x-16">
        {/* IMAGE SECTION */}
        <div className="flex flex-col space-y-2 w-full rounded-md">
          <Image
            alt="product-1"
            src={productData?.images[0] || "/default-image.jpg"}
            width={624}
            height={624}
            className="bg-secondary rounded-md w-full h-full"
          />
          <Image
            alt="product-1"
            src={productData?.images[0] || "/default-image.jpg"}
            width={624}
            height={624}
            className="bg-secondary rounded-md w-full h-full"
          />
          <Image
            alt="product-1"
            src={productData?.images[0] || "/default-image.jpg"}
            width={624}
            height={624}
            className="bg-secondary  rounded-md w-full h-full"
          />
          <Image
            alt="product-1"
            src={productData?.images[0] || "/default-image.jpg"}
            width={624}
            height={624}
            className="bg-secondary  rounded-md w-full h-full"
          />
        </div>
        {/* RIGHT SIDE */}
        {pageLoading ? (
          <div className="flex flex-col w-full space-y-8">
            <LineSkeleton />
            <LineSkeleton />
            <LineSkeleton />
          </div>
        ) : (
          <div className="flex flex-col w-full space-y-8">
            <div className="flex flex-col space-y-2">
              <h1 className="text-[31px] font-semibold">
                {productData?.title}
              </h1>

              <div className="flex flex-row">
                <Rating rating={productData?.rating || 0} />
                <p className="text-gray-500 mx-2">
                  {productData?.rating} stars
                </p>
              </div>

              {/* PRICE SECTION */}
              <div className="flex flex-row items-center space-x-2">
                <p className="text-[26px] text-primary font-semibold">
                  $
                  {productData?.discount === 0
                    ? productData.price
                    : productData?.discount}
                </p>
                {productData?.discount !== 0 ? (
                  <p className="line-through text-gray-400">
                    ${productData?.price}
                  </p>
                ) : null}
                {productData?.discount !== 0 ? (
                  <div className="text-red bg-rose-100 rounded-full px-2 py-1">
                    -
                    {Math.floor(
                      ((productData?.discount ?? 0) /
                        (productData?.price ?? 1)) *
                        100
                    )}
                    %
                  </div>
                ) : null}
              </div>
              <p className="text-gray-600">
                Ultra-functional and elegantly minimalist, our Luxe Armchair
                Collection draws inspiration from Nordic-style décor. It
                features a neutral color palette and natural wood accents,
                highlighted by uniquely designed hexagonal legs.{" "}
              </p>
            </div>

            {/* COLOR SELECTION */}
            <div className="flex flex-row items-center justify-between">
              {/* COLOR */}
              <div className="flex flex-row space-x-2">
                {productData?.colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    style={{
                      borderColor: index === selectedColor ? "#5F6980" : "",
                    }}
                    className="w-[50px] h-[50px] rounded-2xl border-2 border-white cursor-pointer"
                  >
                    <div
                      className={`w-full h-full  rounded-2xl `}
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                ))}
              </div>
              {/* ITEM COUNT */}
              <input
                value={count}
                onChange={(event) => setCount(parseInt(event.target.value))}
                type="number"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
              w-[77px] h-[63px] rounded-2xl bg-secondary border-2 text-center text-[26px] font-semibold text-gray-500 flex"
              ></input>
            </div>
            <MyButton
              disabled={loading}
              onClick={handleAddToCart}
              name="Buy now"
              className="text-white w-full"
            />
            <div className="flex flex-row space-x-2 items-center">
              <Box width={20} height={20} />
              <p className="text-sm">Free shipping included</p>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <Leaf width={20} height={20} />
              <p className="text-sm">Made from the best of materials sourced</p>
            </div>
          </div>
        )}
      </div>
      <PeopleAlsoViewedSection />
    </div>
  );
};

export default ProductPage;
