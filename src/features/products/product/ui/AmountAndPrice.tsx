"use client";

import PlusIcon from "@/public/svg/plus-button.svg";
import MinusIcon from "@/public/svg/minus-button.svg";
import { ChangeEvent } from "react";
import Decimal from "decimal.js";

export default function AmountAndPrice({ amount, price, changeAmount }: {
  amount: number,
  price: Decimal,
  changeAmount: (quantity: number) => void
}) {
  const increaseAmount = () => {
    changeAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount === 1) return;
    changeAmount(amount - 1);
  };

  const setAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    if (newAmount > 0) {
      changeAmount(newAmount);
    }
  };

  return (
    <div className={"flex justify-between mb-4 max-w-40"}>
      <div className={"flex gap-1 justify-between"}>
        <button className={"cursor-pointer"}
                onClick={decreaseAmount}>
          <MinusIcon />
        </button>
        <input className={"input-no-spinner w-6 text-center"}
               type={"number"}
               value={amount}
               onChange={(e) =>
                 setAmount(e)}
        />
        <button className={"cursor-pointer"}
                onClick={increaseAmount}>
          <PlusIcon />
        </button>
      </div>
      <p>
        {`${new Decimal(price).mul(amount)} €`}
      </p>
    </div>
  );
}