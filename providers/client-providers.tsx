"use client";

import CartProvider from "@/providers/cart-provider";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { CartItem } from "@prisma/client";

export default function ClientProviders({ children, dbCartItems, session }: {
  children: ReactNode,
  dbCartItems: CartItem[] | undefined,
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}