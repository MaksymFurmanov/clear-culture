"use client";

import CheckIcon from "@/public/img/check.svg";
import { useRouter } from "next/navigation";

export default function SuccessContainer() {
  const router = useRouter();

  const toOrders = () => {
    router.replace("/orders");
  };

  const toCatalog = () => {
    router.replace("/catalog");
  };

  return (
    <div className={"w-full h-[85dvh] md:text-base flex justify-center items-center"}>
      <div
        className={"bg-light-green max-w-100 w-full flex flex-col justify-center rounded-lg p-8 pt-12 mx-8"}>
        <CheckIcon className={"mb-6 mx-auto fill-dark-blue stroke-white"} />
        <h1 className={"text-xl md:text-2xl text-center mb-12"}>
          Payment successful
        </h1>
        <button className={"bg-dark-blue rounded-full cursor-pointer text-white py-1 mb-5 mx-auto w-40"}
                onClick={toOrders}
        >
          My orders
        </button>
        <button className={"bg-dark-blue rounded-full cursor-pointer text-white py-1 mb-3 mx-auto w-40"}
                onClick={toCatalog}
        >
          Back to catalog
        </button>
      </div>
    </div>
  );
}