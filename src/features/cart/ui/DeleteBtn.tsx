"use client";

import Trash from "@/public/svg/trash.svg";
import { useCart } from "@/src/app/providers/cart-provider";

export default function DeleteBtn({ productId }: {
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