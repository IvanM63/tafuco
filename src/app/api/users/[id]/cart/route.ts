import { prisma } from "@/utils/db";

//GET CURRENT USER CART
export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: parseInt(params.id),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart)
      return new Response(JSON.stringify("Cart not found"), { status: 404 });
    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

//Add to cart database with current user
export const POST = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: Request,
  { params }: { params: { id: string } }
) => {
  //Check if params contain userId or not!
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });

  //Deconstruct cart item properties from request
  const { productId, quantity } = await request.json();
  //Check if body response exist
  if (!productId || !quantity)
    return new Response(JSON.stringify("Require body!"), { status: 400 });

  try {
    //1.Check if this user had Cart, if true then we do not need to create new Cart
    let cartExsist = await prisma.cart.findUnique({
      where: {
        userId: parseInt(params.id),
      },
      include: { items: true },
    });

    //2.If no cart
    if (!cartExsist)
      cartExsist = await prisma.cart.create({
        data: {
          userId: parseInt(params.id),
          items: { create: [] }, // Initialize with an empty array of the correct type
        },
        include: { items: true }, // Ensure items are included in the response
      });

    //3.Check if this product already exsist in cart
    const exsistingCartItem = cartExsist?.items.find(
      (item) => item.productId === productId
    );

    //4.If product exist add it's quantity
    if (exsistingCartItem) {
      await prisma.cartItem.update({
        where: {
          id: exsistingCartItem.id,
        },
        data: { quantity: exsistingCartItem.quantity + quantity },
      });
    } else {
      //If the product doesn't exist the just create it
      await prisma.cartItem.create({
        data: {
          cartId: cartExsist?.id ?? 0,
          productId,
          quantity,
        },
      });
    }
    return new Response(JSON.stringify("Success add product to cart"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

//Update Cart Item, especially the quantity
export const PATCH = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: Request,
  { params }: { params: { id: string } }
) => {
  //Check if params contain userId or not!
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });

  //Deconstruct cart item properties from request
  const { productId, quantity } = await request.json();
  //Check if body response exist
  if (!productId || !quantity)
    return new Response(JSON.stringify("Require body!"), { status: 400 });

  try {
    //1.Check if this user had Cart
    const cartExsist = await prisma.cart.findUnique({
      where: {
        userId: parseInt(params.id),
      },
      include: { items: true },
    });

    //2.If no cart, then return error
    if (!cartExsist)
      return new Response(JSON.stringify("There is no cart in this user"), {
        status: 404,
      });

    //3.Check if this product already exsist in cart
    const exsistingCartItem = cartExsist?.items.find(
      (item) => item.productId === productId
    );

    //4.If product exist add it's quantity
    if (exsistingCartItem) {
      await prisma.cartItem.update({
        where: {
          id: exsistingCartItem.id,
        },
        data: { quantity: quantity },
      });
    } else {
      //If the product doesn't exist the just create it
      await prisma.cartItem.create({
        data: {
          cartId: cartExsist?.id ?? 0,
          productId,
          quantity,
        },
      });
    }
    return new Response(JSON.stringify("Success update product to cart"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

//DELETE ITEMS IN CART
export const DELETE = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: Request,
  { params }: { params: { id: string } }
) => {
  //Check if params contain userId or not!
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });

  //Deconstruct cart item properties from request
  const { id } = await request.json();
  //Check if body response exist
  if (!id)
    return new Response(JSON.stringify("Require body!"), { status: 400 });

  try {
    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify("Success delete item from cart"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
