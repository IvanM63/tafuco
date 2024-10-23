import { prisma } from "@/utils/db";
import { OrderStatus } from "@prisma/client";
import { NextRequest } from "next/server";

//GET CURRENT USER ORder
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });

  //Get the query from url page and per_page
  const page = request.nextUrl.searchParams.get("page");
  const perPage = request.nextUrl.searchParams.get("per_page");
  const filterParams = request.nextUrl.searchParams.get("filter");

  //Filter logic, sorry for bad code writing, i know this code is an abomination, you can't escape it
  const filter =
    filterParams === "active"
      ? [
          { status: "PENDING" as OrderStatus },
          { status: "SHIPPED" as OrderStatus },
        ]
      : filterParams === "cancelled"
      ? [{ status: "CANCELED" as OrderStatus }]
      : filterParams === "completed"
      ? [{ status: "DELIVERED" as OrderStatus }]
      : [{ userId: parseInt(params.id) }];

  //Pagination logic
  const currentPage = parseInt(page ?? "1");
  const take = parseInt(perPage ?? "5");
  const skip = (currentPage - 1) * take;

  try {
    const totalItems = await prisma.order.count({
      where: {
        userId: parseInt(params.id),
        OR: filter,
      },
    });

    //1b. if limit exist in params, then set maximum return items to it's limit
    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(params.id),
        OR: filter,
      },
      include: {
        items: { include: { product: true } },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    //2.If user has not order anything, then return error with message
    if (orders.length < 1)
      return new Response(JSON.stringify("Users hasn't ordered yet!"), {
        status: 400,
      });

    return new Response(
      JSON.stringify({
        currentPage,
        totalPages: Math.ceil(totalItems / take),
        totalItems,
        orders,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

//Add to Order database with current user
export const POST = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: Request,
  { params }: { params: { id: string } }
) => {
  //Check if params contain userId or not!
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });

  try {
    //1.Get cart from current user
    const result = await fetch(
      process.env.URL + `/api/users/${params.id}/cart`,
      {
        method: "GET",
      }
    );
    //if cart doesn't exist then user cannot make payment
    if (!result.ok) {
      return new Response(
        JSON.stringify(
          "There are no items in the cart, please add to cart first"
        ),
        {
          status: 404,
        }
      );
    }
    const cart = await result.json();

    //2.Create new order and set status to PENDING
    const newOrder = await prisma.order.create({
      data: {
        userId: parseInt(params.id),
        status: "PENDING",
      },
    });

    //3.Put everything from cart to order properties
    const cartItems = await cart.items;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderItems = cartItems.map((item: any) => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: parseInt(item.quantity),
      price: parseFloat(item.product.price),
    }));
    const addOrderItems = await prisma.orderItem.createMany({
      data: orderItems,
    });

    //4.If success then delete current cartItems
    if (!addOrderItems) {
      return new Response(JSON.stringify("Failed to order from this user"), {
        status: 400,
      });
    }
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    //5. Return success
    return new Response(JSON.stringify("Order from this user success"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
