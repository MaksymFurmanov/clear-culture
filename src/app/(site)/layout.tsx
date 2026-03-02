import { ReactNode } from "react";
import Header from "@/src/shared/header/ui/Header";
import CartBtn from "@/src/shared/buttons/CartBtn";
import Footer from "@/src/shared/footer/ui/Footer";
import EmailVerificationAlert from "@/src/features/auth/alerts/EmailConfirmationAlert";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <EmailVerificationAlert />
      {children}
      <CartBtn />
      <Footer />
    </>
  );
}
