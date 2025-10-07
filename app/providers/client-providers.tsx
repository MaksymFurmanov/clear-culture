"use client";

import CartProvider from "@/app/providers/cart-provider";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function ClientProviders({ children, session }: {
  children: ReactNode,
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