"use client";

import AmountAndPrice from "./amount-and-price";
import { useState } from "react";
import { useProductGroup } from "@/providers/products-by-group-provider";
import ProductProperties from "@/containers/site-pages/product/product-properties";
import AddToCartButton from "@/containers/site-pages/product/add-to-cart-button";
import AddToFavoritesButton from "@/containers/site-pages/product/add-to-favorites-button";

export default function AddProductField() {
  const { curr } = useProductGroup();
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className={"w-1/2"}>
      <div className={"mb-4"}>
        <h2 className={"text-lg mt-2 mb-2"}>
          {curr.name}
        </h2>
        <ProductProperties color={curr.color} />
      </div>

      <AmountAndPrice amount={amount}
                      price={curr.price}
                      changeAmount={setAmount}
      />

      <AddToCartButton amount={amount}/>

      <AddToFavoritesButton />
    </div>
  );
}