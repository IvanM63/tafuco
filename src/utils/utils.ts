export function titleCase(string: string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Get date components
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "long" }); // Full month name
  const year = date.getUTCFullYear();

  // Get time components
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  return `${day} ${month} ${year} ${hours}:${minutes} ${period}`;
}

export function calculatePriceForOrder(orderItems: OrderItem[]) {
  return orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export function calculatePriceForCart(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => {
    return (
      total +
      (item.product.discount != 0
        ? item.product.discount
        : item.product.price) *
        item.quantity
    );
  }, 0);
}

export function getSortFilter(query: string) {
  const sortFilterType = [
    {
      name: "Most Recent",
      sortFilter: {
        createdAt: "desc",
      },
    },
    {
      name: "Most Oldest",
      sortFilter: {
        createdAt: "asc",
      },
    },
    {
      name: "Highest Price",
      sortFilter: {
        price: "desc",
      },
    },
    {
      name: "Lowest Price",
      sortFilter: {
        price: "asc",
      },
    },
  ];

  return sortFilterType.find((item) => item.name === query)?.sortFilter ?? {};
}
