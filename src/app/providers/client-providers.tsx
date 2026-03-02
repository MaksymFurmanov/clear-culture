"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import CartProvider from "@/src/app/providers/cart-provider";
import { AlertProvider } from "@/src/app/providers/alert-provider";

export default function ClientProviders({ children, session }: {
  children: ReactNode,
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <AlertProvider>
          {children}
        </AlertProvider>
      </CartProvider>
    </SessionProvider>
  );
}