"use client";
import RouteBreadcrumb from "@/components/RouteBreadcrumb";
import React, { useEffect, useState } from "react";
import ProductCategorySelector from "@/components/ProductCategorySelector";
import InputSearch from "@/components/InputSearch";
import CustomSection from "@/components/CustomSection";
import { useRouter, useSearchParams } from "next/navigation";
import PeopleAlsoViewedSection from "@/components/PeopleAlsoViewed";

const CategoriesPage = () => {
  const query = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(
    query.get("categories") ?? "All"
  );
  const [search, setSearch] = useState(query.get("search") ?? "");
  const [sort, setSort] = useState<SortByType>(
    (query.get("sort_by") as SortByType) ?? "Most Recent"
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getSearchedProducts = async () => {
      try {
        setLoading(true);
        const result = await fetch(`/api/products?${query.toString()}`, {
          method: "GET",
        });
        const getProducts = await result.json();
        setProducts(getProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSearchedProducts();
  }, [query]);

  const handleOnSubmitSearch = async (searchParams: string) => {
    router.push(
      `/categories?categories=${categories}&search=${searchParams}&sort_by=${sort}`,
      {
        scroll: false,
      }
    );
    setSearch(searchParams);
  };

  const handleOnChangeCategories = async (cat: string) => {
    router.push(
      `/categories?categories=${cat}&search=${search}&sort_by=${sort}`,
      {
        scroll: false,
      }
    );
    setCategories(cat);
  };

  const handleOnChangeSortBy = async (sort: SortByType) => {
    router.push(
      `/categories?categories=${categories}&search=${search}&sort_by=${sort}`,
      {
        scroll: false,
      }
    );
    setSort(sort);
  };

  return (
    <main className="flex flex-col h-full w-full pt-20 md:px-20 px-4 space-y-20 mb-20">
      {/* FIRST TEXT SECTION */}
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl font-bold">
          Browse our {categories === "All" ? "Catalogue" : categories}
        </h1>
        <p className="md:text-lg md:px-20 text-gray-500">
          Transform your sitting room with our elegant and functional seating
          options, perfect for every modern home.
        </p>
        <RouteBreadcrumb
          array={[
            { name: "Homepage", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: "Categories", href: "/categories" },
          ]}
        />

        <InputSearch
          onSubmit={handleOnSubmitSearch}
          onChange={setSearch}
          firstValue={search}
        />
      </div>
      {/* CATEGORIES SELECTION */}
      <ProductCategorySelector
        onChange={handleOnChangeCategories}
        firstValue={categories}
      />
      {/* TOP PRODUCTS / SEARCHED PRODUCT */}
      <CustomSection
        title="Search Product"
        products={products}
        onChangeDropDown={handleOnChangeSortBy}
        dropDownFirstValue={sort}
        loading={loading}
      />
      <PeopleAlsoViewedSection />
    </main>
  );
};

export default CategoriesPage;
