"use client";

import CartProvider from "@/app/providers/cart-provider";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AlertProvider } from "@/app/providers/alert-provider";

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