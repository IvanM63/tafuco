"use server";
export const getCartCount = async ({ id }: { id: string }) => {
  try {
    const apiUrl = process.env.URL;
    const result = await fetch(apiUrl + `/api/users/${id}/cart`, {
      method: "GET",
    });
    const cart = await result.json();
    const cartCount = cart.items.length;

    return cartCount;
  } catch (error) {
    console.log(error);
  }
};
