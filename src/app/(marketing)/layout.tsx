import { ReactNode } from "react";
import Header from "@/src/shared/header/ui/Header";

export default function CreateOrderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}