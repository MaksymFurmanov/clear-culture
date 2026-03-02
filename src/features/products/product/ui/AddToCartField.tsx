"use client";

import { useState } from "react";
import { useProductGroup } from "@/src/app/providers/products-by-group-provider";
import Properties from "@/src/features/products/product/ui/Properties";
import AmountAndPrice from "@/src/features/products/product/ui/AmountAndPrice";
import AddToCartBtn from "@/src/features/products/product/ui/AddToCartBtn";

export default function AddToCartField() {
  const { curr } = useProductGroup();
  const [quantity, setQuantity] = useState<number>(1);

  const changeAmount = (quantity: number) => {
    setQuantity(quantity);
  };

  return (
    <>
      <div className={"mb-4"}>
        <h2 className={"text-lg mt-2 mb-2"}>
          {curr.name}
        </h2>
        <Properties color={curr.color} />
      </div>

      <AmountAndPrice amount={quantity}
                      price={curr.price}
                      changeAmount={changeAmount}
      />

      <AddToCartBtn quantity={quantity} />
    </>
  );
}