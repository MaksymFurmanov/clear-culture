import GooglePayIcon from "@/public/img/payment/google-pay.svg";
import ApplePayIcon from "@/public/img/payment/apple-pay.svg";

export default function ExternalPaymentMethods() {
  return (
    <div className={"flex gap-4 my-6 ml-4"}>
      <button className={"px-5 py-1 border rounded-lg cursor-pointer hover:bg-gray-100"}>
        <GooglePayIcon className={"w-12 h-6"}/>
      </button>
      <button className={"px-5 border rounded-lg cursor-pointer hover:bg-gray-100"}>
        <ApplePayIcon className={"w-12 h-8"}/>
      </button>
    </div>
  );
}