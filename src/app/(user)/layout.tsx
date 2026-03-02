import { ReactNode } from "react";
import Header from "@/src/shared/header/ui/Header";
import CartBtn from "@/src/shared/buttons/CartBtn";
import Footer from "@/src/shared/footer/ui/Footer";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CartBtn />
      <Footer />
    </>
  )
}
