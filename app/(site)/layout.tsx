import Header from "@/components/header";
import Footer from "@/components/footer";
import { ReactNode } from "react";
import CartButton from "@/components/cart-button";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CartButton />
      <Footer />
    </>
  )
}
