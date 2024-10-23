import { prisma } from "@/utils/db";

//GET CURRENT USER CART
export const GET = async (
  _request: Request,
  { params }: { params: { id: string; orderId: string } }
) => {
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });
  try {
    //1.Get all orders from current user
    const orders = await prisma.order.findMany({
      where: {
        id: parseInt(params.orderId),
      },
      include: {
        items: { include: { product: true } },
      },
    });
    //2.If user has not order anything, then return error with message
    if (orders.length < 1)
      return new Response(JSON.stringify("Users hasn't ordered yet!"), {
        status: 400,
      });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
