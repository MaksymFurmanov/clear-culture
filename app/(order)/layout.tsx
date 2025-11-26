import Header from "../../containers/header";
import { ReactNode } from "react";

export default function CreateOrderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}