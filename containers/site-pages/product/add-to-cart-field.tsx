"use client";

import Properties from "@/containers/site-pages/product/properties";
import AmountAndPrice from "@/containers/site-pages/product/amount-and-price";
import AddToCartButton from "@/containers/site-pages/product/add-to-cart-button";
import { useProductGroup } from "@/app/providers/products-by-group-provider";
import { useState } from "react";

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

      <AddToCartButton quantity={quantity} />
    </>
  );
}