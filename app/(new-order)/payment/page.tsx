import ExternalPaymentMethods from "@/containers/order-pages/payment/external-payment-methods";
import PaymentForm from "@/containers/order-pages/payment/form";
import { getSelectedAddress } from "@/lib/actions/address";
import { redirect } from "next/navigation";

export default async function PaymentPage() {
  const address = await getSelectedAddress();
  if(!address) redirect("/choose-address");

  return (
    <main className={"max-w-150 mx-auto"}>
      <ExternalPaymentMethods />
      <PaymentForm address={address}/>
    </main>
  );
}