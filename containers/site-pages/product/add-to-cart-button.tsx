"use client";

import { useProductGroup } from "@/providers/products-by-group-provider";
import { useCart } from "@/providers/cart-provider";

export default function AddToCartButton({ quantity }: {
  quantity: number
}) {
  const { curr } = useProductGroup();
  const { addToCartOrUpdate, signalAdd } = useCart();

  const buttonHandler = async () => {
    await addToCartOrUpdate(curr.id, quantity);
    signalAdd();
  }

  return (
    <button className={"bg-dark-blue text-white cursor-pointer rounded-md py-1 px-5 mb-2"}
            onClick={buttonHandler}
    >
      Add to cart
    </button>
  );
}