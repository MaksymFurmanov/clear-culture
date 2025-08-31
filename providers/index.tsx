"use client";

import ProductsInCartProvider from "./products-in-cart-provider";
import { ReactNode } from "react";

export default function Providers({children}: {
  children: ReactNode
}) {
  return (
    <ProductsInCartProvider>
      {children}
    </ProductsInCartProvider>
  );
}