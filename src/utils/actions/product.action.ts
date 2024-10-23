"use server";

export const getProduct = async ({ id }: { id: string }) => {
  try {
    const apiUrl = process.env.URL;
    const response = await fetch(apiUrl + `/api/products/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
