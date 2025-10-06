"use client";

import { useCart } from "@/app/providers/cart-provider";
import Trash from "@/public/img/trash.svg";

export default function DeleteButton({ productId }: {
  productId: string
}) {
  const { removeFromCart } = useCart();

  const deleteHandler = () => {
     removeFromCart(productId);
  };

  return (
    <button className={"cursor-pointer h-fit m-1"}
            onClick={deleteHandler}>
      <Trash className={"w-3 lg:w-4"} />
    </button>
  );
}