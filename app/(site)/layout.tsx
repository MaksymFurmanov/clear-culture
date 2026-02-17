import Header from "../../containers/header";
import Footer from "../../containers/footer";
import { ReactNode } from "react";
import CartButton from "@/components/buttons/cart-button";
import EmailConfirmationAlert from "@/components/alerts/email-confirmation-alert";

export default function SiteLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <Header />
      <EmailConfirmationAlert />
      {children}
      <CartButton />
      <Footer />
    </>
  );
}
