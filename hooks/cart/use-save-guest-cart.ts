"use client"

import { useEffect } from "react";
import { saveCart } from "@/lib/localStorage/cart";
import { CartItemWithProduct } from "@/types";

export function useSaveGuestCart(userId: string | undefined, items: CartItemWithProduct[]) {
  useEffect(() => {
    if (!userId) saveCart(items);
  }, [items, userId]);
}
