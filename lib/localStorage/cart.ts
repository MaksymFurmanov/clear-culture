import { CartItemWithProduct } from "@/types";
import { deserialize, serialize } from "@/lib/utils/superjson";

export const loadCart = () => {
  const stored = localStorage.getItem("cart");
  return stored ? deserialize<CartItemWithProduct[]>(stored) : [];
};

export const saveCart = (cart: CartItemWithProduct[]) => {
  localStorage.setItem("cart", serialize(cart));
};