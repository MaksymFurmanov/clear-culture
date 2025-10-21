"use client";

import { useEffect } from "react";
import Decimal from "decimal.js";
import { CartItemWithProduct } from "@/types";
import { getCartTotalPrice } from "@/lib/actions/cart-items";

export function useCartTotal(
  userId: string | undefined,
  items: CartItemWithProduct[],
  dispatch: any
) {
  useEffect(() => {
    if (!userId) {
      const total = items.reduce(
        (sum, item) =>
          sum.add(new Decimal(item.product.price).mul(item.quantity)),
        new Decimal(0)
      ).toString();

      dispatch({ type: "SET_TOTAL_PRICE", payload: total });
      return;
    }

    (async () => {
      dispatch({ type: "SET_LOADING_TOTAL", payload: true });
      try {
        const total = await getCartTotalPrice();
        dispatch({ type: "SET_TOTAL_PRICE", payload: total });
      } finally {
        dispatch({ type: "SET_LOADING_TOTAL", payload: false });
      }
    })();
  }, [items]);
}