"use client";

import Link from "next/link";
import { useCart } from "@/src/app/providers/cart-provider";
import ItemCard from "@/src/features/cart/ui/ItemCard";

export default function CartList() {
  const { cartItems, totalPrice, loadingTotal } = useCart();

  return (
    <div className={"text-base md:text-lg"}>
      {cartItems.map((cartItem, index) => (
        <ItemCard key={index}
                  cartItem={cartItem}
        />
      ))}

      <div className={"flex justify-between rounded-xl bg-green px-6 py-3 mx-6 mb-8"}>
        <p>
          Sum:
        </p>
        {loadingTotal ? <p>Loading</p> : <p> {totalPrice} €</p>}
      </div>

      <Link href={"/choose-address"}>
        <button
          className={"block bg-dark-blue text-white cursor-pointer rounded-full py-1 px-12 mt-3 mx-auto mb-8"}>
          Confirm
        </button>
      </Link>
    </div>
  );
}