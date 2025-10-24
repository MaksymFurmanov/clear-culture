"use client"

import { useEffect } from "react";
import { loadCart } from "@/lib/localStorage/cart";
import { CartItemWithProduct } from "@/types";
import { getCartItemsForClient } from "@/lib/actions/cart-items";
import { deserialize } from "@/lib/utils/superjson";

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