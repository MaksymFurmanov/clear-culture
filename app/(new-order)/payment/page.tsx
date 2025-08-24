import ExternalPaymentMethods from "@/containers/pages/payment/external-payment-methods";
import CardForm from "@/containers/pages/payment/card-form";

export default function PaymentPage() {
  return (
    <main className={"max-w-150 mx-auto"}>
      <ExternalPaymentMethods />
      <CardForm />
    </main>
  );
}