"use client";

import { useEffect } from "react";
import { serialize } from "@/src/lib/utils/superjson";
import { createOrUpdateCartItems } from "@/src/lib/actions/cart-items";
import { CartItemWithProduct } from "@/src/features/cart/cart.types";
import { loadCart } from "@/src/features/cart/cart.service";

export function useSyncGuestCartToServer(userId: string | undefined, dispatch: any) {
  useEffect(() => {
    if (userId) {
      (async () => {
        dispatch({ type: "SET_LOADING_CART", payload: true });
        try {
          const cart = loadCart();
          if (cart.length > 0) {
            await createOrUpdateCartItems(cart, true);
          }
          localStorage.setItem("cart", serialize<CartItemWithProduct[]>([]));
        } finally {
          dispatch({ type: "SET_LOADING_CART", payload: false });
        }
      })();
    }
  }, [userId]);
}