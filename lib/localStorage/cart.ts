import { CartItemWithProduct } from "@/types";
import { deserialize, serialize } from "@/lib/utils/superjson";

export function loadCart() {
  const stored = localStorage.getItem("cart");
  return stored ? deserialize<CartItemWithProduct[]>(stored) : [];
}

export function saveCart(cart: CartItemWithProduct[]) {
  localStorage.setItem("cart", serialize<CartItemWithProduct[]>(cart));
}