"use client";

import { useCart } from "@/app/providers/cart-provider";
import Link from "next/link";
import CartList from "@/containers/order-pages/cart/cart-list";

export default function Cart() {
  const { cartItems, loadingCart } = useCart();

  return (
    loadingCart ? (
      <p>Loading</p>
    ) : (
      cartItems.length === 0 ? (
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
        <CartList/>
      )
    )
  );
}