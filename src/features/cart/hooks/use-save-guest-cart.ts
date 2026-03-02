"use client"

import { useEffect } from "react";
import { CartItemWithProduct } from "@/src/features/cart/cart.types";
import { saveCart } from "@/src/features/cart/cart.service";

export function useSaveGuestCart(userId: string | undefined, items: CartItemWithProduct[]) {
  useEffect(() => {
    if (!userId) saveCart(items);
  }, [items, userId]);
}
