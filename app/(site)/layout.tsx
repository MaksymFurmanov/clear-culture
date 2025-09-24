import Header from "../../containers/header";
import Footer from "../../containers/footer";
import { ReactNode } from "react";
import CartButton from "@/components/buttons/cart-button";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CartButton />
      <Footer />
    </>
  );
}
