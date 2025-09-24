"use client";

import CartProvider from "@/app/providers/cart-provider";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { deserialize } from "@/lib/utils/superjson";
import { CartItemWithProduct } from "@/types";

export default function ClientProviders({ children, superDbCartItems, session }: {
  children: ReactNode,
  superDbCartItems: string | null,
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider dbCartItems={superDbCartItems
        ? deserialize<CartItemWithProduct[]>(superDbCartItems)
        : null
      }>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}