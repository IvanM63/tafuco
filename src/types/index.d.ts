declare type SortByType =
  | "Most Recent"
  | "Most Oldest"
  | "Highest Price"
  | "Lowest Price";

declare type InputForm = {
  name: "phone" | "firstName" | "lastName" | "address" | "city" | "country";
  placeholder: string;
};

declare type BasicInfoForm = {
  name: "fullName" | "email" | "gender" | "username";
  placeholder: string;
};

declare type Product = {
  id: string;
  title: string;
  rating: number;
  price: number;
  discount: number;
  desc: string;
  images: string[];
  colors: string[];
  category: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

declare type CartItem = {
  id: number;
  cartId: number;
  productId: string;
  quantity: number;
  product: Product;
};

declare type OrderItem = {
  id: number;
  orderId: number;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
};

declare type Order = {
  id: number;
  userId: number;
  status: OrderStatus; // Add more statuses if needed
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  items: OrderItem[];
};

declare type OrderProps = {
  order: Order;
};

declare type Address = {
  firstName: string;
  lastName: string;
  number: string;
  address: string;
  city: string;
  country: string;
};

declare type UserDropDownProps = {
  images?: string;
  fullName: string;
  email: string;
};
declare type CartItemCardProps = {
  onDelete: () => void;
  currentCartItems: CartItem;
  handleQuantityChange: (cartItemId: string, newQuantity: number) => void;
};

declare type Product = {
  id: string;
  title: string;
  rating?: number;
  price: number;
  discount?: number;
  desc: string;
  images: string[];
  colors: string[];
  category: string;
};

declare type ProductDetailProps = {
  id: string;
  title: string;
  rating?: number;
  price: number;
  discount?: number;
  desc: string;
  images: string[];
  colors: string[];
  category: string;
};

declare type ProductCardProps = {
  id?: string;
  name: string;
  image: string[];
  price: float;
  colors: string[];
  onClick?: () => void;
};

declare type MyButtonProps = {
  name?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

declare type inputSearchProps = {
  firstValue: string;
  onSubmit: (searchParams: string) => void;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

declare type ProductCategoryProps = {
  name: string;
  selected?: name;
  setSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

declare type ElementNavigation = {
  name: string;
  href: string;
};

declare type HomeCategory = {
  name: string;
  href: string;
  image: string;
  className?: string;
  i?: number;
};

declare type FAQSection = {
  title: string;
  desc: string;
  index?: number;
};

declare type DesignInspiration = {
  image: string;
  category: string;
};
