'use client';

import Receipt from "@/components/receipt";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useCart } from "@/providers/products-in-cart-provider";

export default function CardForm() {
  const router = useRouter();

  const { cartItems } = useCart();

  let price = 0;
  cartItems.map((cartItem) => {
    price += cartItem.productVariant.price * cartItem.count;
  });

  const delivery = 3.5;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.replace("/payment-success");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={"mb-8"}>
        <h2 className={"text-2xl ml-4 mb-5"}>
          Card details
        </h2>
        <Card/>
      </div>

      <Receipt price={price} delivery={delivery}/>

      <button type={"submit"}
              className={"block bg-dark-blue text-white text-lg rounded-full cursor-pointer px-10 py-1 mr-6 ml-auto mb-6"}>
        Pay
      </button>
    </form>
  );
}

const Card = () => {
  return (
    <div className={"bg-[linear-gradient(270deg,_rgba(42,44,53,0.95)_0%,_#7B819B_100%)] " +
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
    </div>
  );
}