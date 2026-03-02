import { CartItemWithProduct } from "@/src/features/cart/cart.types";
import { deserialize, serialize } from "@/src/lib/utils/superjson";

export function loadCart() {
  const stored = localStorage.getItem("cart");
  return stored ? deserialize<CartItemWithProduct[]>(stored) : [];
}

export function saveCart(cart: CartItemWithProduct[]) {
  localStorage.setItem("cart", serialize<CartItemWithProduct[]>(cart));
}