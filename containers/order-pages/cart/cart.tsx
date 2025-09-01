"use client";

import { Suspense } from "react";
import { useCart } from "@/providers/cart-provider";
import ItemCard from "@/containers/order-pages/cart/item-card";
import Link from "next/link";

export default function Cart() {
  const { cartItems, totalPrice } = useCart();

  return cartItems.length === 0 ? (
    <div className={"flex flex-col gap-2 items-center justify-center h-[50dvh]"}>
      <p className={"text-xl md:text-2xl text-gray-500"}>
        The cart is empty
      </p>
      <Link href={"/catalog/1"}>
        <button
          className={"block bg-dark-blue text-white md:text-lg cursor-pointer rounded-full py-1 px-12 mt-3 mx-auto mb-8"}
        >
          Shop now
        </button>
      </Link>
    </div>
  ) : (
    <div className={"text-base md:text-lg"}>
      {cartItems.map((cartItem, index) => (
        <ItemCard key={index}
                  product={cartItem}
                  index={index}
        />
      ))}
      <div className={"flex justify-between rounded-xl bg-green px-6 py-3 mx-6 mb-8"}>
        <p>
          Sum:
        </p>
        <Suspense fallback={<p>Loading sum...</p>}>
          <p>
            {totalPrice.toString()} €
          </p>
        </Suspense>
      </div>
      <Link href={"/containers/order-pages/new-address"}>
        <button className={"block bg-dark-blue text-white cursor-pointer rounded-full py-1 px-12 mt-3 mx-auto mb-8"}>
          Confirm
        </button>
      </Link>
    </div>
  );
}