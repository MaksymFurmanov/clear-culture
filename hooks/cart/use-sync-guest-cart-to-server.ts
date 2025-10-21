"use client";

import { useEffect } from "react";
import { serialize } from "@/lib/utils/superjson";
import { loadCart } from "@/lib/localStorage/cart";
import { CartItemWithProduct } from "@/types";
import { createOrUpdateCartItems } from "@/lib/actions/cart-items";

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