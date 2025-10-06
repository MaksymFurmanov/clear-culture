"use client";

import { ChangeEvent, useState } from "react";
import MinusIcon from "@/public/img/minus-button.svg";
import PlusIcon from "@/public/img/plus-button.svg";
import { useCart } from "@/app/providers/cart-provider";

export default function CountChangeButtons({ productId, count }: {
  productId: string,
  count: number
}) {
  const [quantity, setQuantity] = useState<number>(count);
  const { updateInCart } = useCart();

  const increaseAmount = () => {
    updateInCart(productId, quantity + 1);
    setQuantity(prevState => prevState + 1);
  };

  const decreaseAmount = () => {
    if (quantity < 2) return;

    updateInCart(productId, quantity - 1);
    setQuantity(prevState => prevState - 1);
  };

  const setAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);

    if (newAmount > 0) {
      updateInCart(productId, newAmount);
      setQuantity(newAmount);
    }
  };

  return (
    <div className={"flex gap-1 justify-between"}>
      <button className={"cursor-pointer"}
              onClick={decreaseAmount}>
        <MinusIcon />
      </button>
      <input className={"input-no-spinner w-6 text-center"}
             type={"number"}
             value={quantity}
             onChange={(e) => setAmount(e)}
      />
      <button className={"cursor-pointer"}
              onClick={increaseAmount}>
        <PlusIcon />
      </button>
    </div>
  );
}