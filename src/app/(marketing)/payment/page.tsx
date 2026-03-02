import { redirect } from "next/navigation";
import ExternalPaymentMethods from "@/src/features/checkout/payment/ui/ExternalPaymentMethods";
import PaymentForm from "@/src/features/checkout/payment/ui/Form";
import { getSelectedAddress } from "@/src/lib/actions/address";

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