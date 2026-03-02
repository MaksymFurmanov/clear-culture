"use client"

import { useEffect } from "react";
import { loadCart } from "@/src/features/cart/cart.service";
import { getCartItemsForClient } from "@/src/lib/actions/cart-items";
import { CartItemWithProduct } from "@/src/features/cart/cart.types";
import { deserialize } from "@/src/lib/utils/superjson";

export function useLoadCartItems(userId: string | undefined, dispatch: any) {
  useEffect(() => {
    if (!userId) {
      dispatch({ type: "SET_ITEMS", payload: loadCart() });
      return;
    }

    (async () => {
      dispatch({ type: "SET_LOADING_CART", payload: true });
      try {
        const dbCartItems = await getCartItemsForClient();
        dispatch({
          type: "SET_ITEMS",
          payload: deserialize<CartItemWithProduct[]>(dbCartItems)
        });
      } finally {
        dispatch({ type: "SET_LOADING_CART", payload: false });
      }
    })();
  }, [userId]);
}