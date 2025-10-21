"use client";

import Receipt from "@/components/receipt";
import { useRouter } from "next/navigation";
import { FormEvent,  } from "react";
import { useCart } from "@/app/providers/cart-provider";
import { createOrder } from "@/lib/actions/order";

export default function CardForm() {
  const router = useRouter();

  const { totalPrice, loadingTotal } = useCart();

  const delivery = "3.5";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createOrder();
    } catch (e) {
      console.error(e);
    }

    router.replace("/payment-success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={"mb-8"}>
        <h2 className={"text-2xl ml-4 mb-5"}>
          Card details
        </h2>
        <Card />
      </div>

      {loadingTotal
        ? <p>Loading</p>
        : <Receipt price={totalPrice}
                   delivery={delivery}
                   total={totalPrice}
        />
      }

      <button type={"submit"}
              className={"block bg-dark-blue text-white text-lg rounded-full cursor-pointer px-10 py-1 mr-6 ml-auto mb-6"}>
        Pay
      </button>
    </form>
  );
}

const Card = () => {
  return (
    <form className={"bg-[linear-gradient(270deg,_rgba(42,44,53,0.95)_0%,_#7B819B_100%)] " +
      "max-w-100 rounded-xl p-6 mx-4"}
    >
      <input className={"block bg-white text-center rounded-md px-2 py-1 w-full mb-4"}
             placeholder={"Card number"}
      />
      <input className={"block bg-white text-center rounded-md px-2 py-1 w-20 mb-4"}
             placeholder={"Exp. date"}
      />
      <input className={"block bg-white text-center rounded-md px-2 py-1 w-12 mb-5 ml-auto"}
             placeholder={"CVV"}
             max={3}
      />
      <input className={"block bg-white text-center rounded-md px-2 py-1 w-4/5"}
             placeholder={"Cardholder name"}
      />
    </form>
  );
};