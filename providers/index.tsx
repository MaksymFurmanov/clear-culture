"use client";

import { ReactNode } from "react";
import CartProvider from "@/providers/cart-provider";

export default function Providers({children}: {
  children: ReactNode
}) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}