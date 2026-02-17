"use client";

import Image from "next/image";
import Circle from "@/public/svg/circle.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/app/providers/cart-provider";

export default function CartButton() {
  const router = useRouter();
  const { cartItems, lastItemAddedAt } = useCart();
  const [alertToggle, setAlertToggle] = useState(false);

  useEffect(() => {
    if (!lastItemAddedAt) return;

    setAlertToggle(true);
    const t = setTimeout(() => setAlertToggle(false), 3000);
    return () => clearTimeout(t);
  }, [lastItemAddedAt]);

  if (cartItems.length === 0) return null;

  return (
    <button
      onClick={() => router.replace("/cart")}
      className={
        "fixed bottom-[5%] right-[5%] z-40 p-2 bg-green rounded-full " +
        "cursor-pointer inline-flex items-center overflow-hidden" +
        "transition-[width] duration-500 ease-in-out"
      }
    >
      <div
        className={`
          flex items-center gap-2 overflow-hidden
          transition-[max-width,opacity,margin] duration-500 ease-in-out
          ${alertToggle
          ? "max-w-56 opacity-100 mx-3"
          : "max-w-0 opacity-0 mx-0"}
        `}
      >
        <Circle className="w-3 fill-[#3cfa39]" />
        <span className="whitespace-nowrap">
          New item added
        </span>
      </div>

      <Image className={"inline-block w-10 fill"}
             src={"/img/sidebar/cart.svg"} alt={""} width={20} height={20}
      />

      <div className={"absolute bottom-0 -right-2 bg-light-green " +
        "rounded-full min-w-7 md:min-w-8 p-1"}>
        <p>
          {cartItems.length}
        </p>
      </div>
    </button>
  );
}
