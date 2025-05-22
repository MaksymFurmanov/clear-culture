import ExternalPaymentMethods from "@/app/(new-order)/payment/external-payment-methods";
import CardForm from "@/app/(new-order)/payment/card-form";


export default function PaymentPage() {
  return (
    <main className={"max-w-150 mx-auto"}>
      <ExternalPaymentMethods />
      <CardForm />
    </main>
  );
}