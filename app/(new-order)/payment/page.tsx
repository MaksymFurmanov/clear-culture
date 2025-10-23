import ExternalPaymentMethods from "@/containers/order-pages/payment/external-payment-methods";
import PaymentForm from "@/containers/order-pages/payment/form";

export default function PaymentPage() {
  return (
    <main className={"max-w-150 mx-auto"}>
      <ExternalPaymentMethods />
      <PaymentForm />
    </main>
  );
}