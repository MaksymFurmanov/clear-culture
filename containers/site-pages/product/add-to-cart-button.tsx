"use client";

import { useProductGroup } from "@/app/providers/products-by-group-provider";
import { useCart } from "@/app/providers/cart-provider";

export default function AddToCartButton({ quantity }: {
  quantity: number
}) {
  const { curr } = useProductGroup();
  const { addToCartOrUpdate } = useCart();

  const buttonHandler = async () => {
    await addToCartOrUpdate(curr.id, quantity, true);
  }

  return (
    <button className={"bg-dark-blue text-white cursor-pointer rounded-md py-1 px-5 mb-2"}
            onClick={buttonHandler}
    >
      Add to cart
    </button>
  );
}