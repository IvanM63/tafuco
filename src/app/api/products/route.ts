import { prisma } from "@/utils/db";
import { getSortFilter, titleCase } from "@/utils/utils";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  //Check if there is query params in utl
  const categoriesQuery = request.nextUrl.searchParams.get("categories");
  const searchQuery = request.nextUrl.searchParams.get("search");
  const sortQuery = request.nextUrl.searchParams.get("sort_by");

  const sortFilter = getSortFilter(sortQuery ?? "");

  //Create filter logic if there is any query params in url
  let filter = {};
  if (categoriesQuery && searchQuery) {
    const category = titleCase(categoriesQuery);
    const search = searchQuery;

    filter = {
      //if category contain all, then do not put category as a filter
      ...(category !== "All" && { category: category }),
      AND: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    };
  } else if (categoriesQuery) {
    const category = titleCase(categoriesQuery);
    filter = {
      ...(category !== "All" && { category: category }),
    };
  }
  //Go try catch to supabase databae
  try {
    const result = await prisma.product.findMany({
      where: filter,
      orderBy: sortFilter,
    });

    if (!result.length)
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
