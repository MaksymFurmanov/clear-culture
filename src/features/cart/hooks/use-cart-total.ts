"use client";

import { useEffect } from "react";
import Decimal from "decimal.js";
import { Cart } from "@prisma/client";
import { CartItemWithProduct } from "@/src/features/cart/cart.types";
import { deserialize } from "@/src/lib/utils/superjson";
import { getCartForClient } from "@/src/lib/actions/cart";

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
        const cart = deserialize<Cart | null>(
          await getCartForClient()
        );

        const total = cart ? cart.price.toString() : "0";

        dispatch({ type: "SET_TOTAL_PRICE", payload: total });
      } finally {
        dispatch({ type: "SET_LOADING_TOTAL", payload: false });
      }
    })();
  }, [items]);
}