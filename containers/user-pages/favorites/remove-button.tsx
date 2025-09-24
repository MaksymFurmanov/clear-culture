"use client";

import { deleteFavoriteProduct } from "@/lib/actions/favorite-product";
import TrashIcon from "@/public/img/trash.svg";

export default function RemoveButton({productId}: {productId: string}) {

  const handleRemove = async () => {
    try {
      await deleteFavoriteProduct(productId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button className={"mr-2 w-4 cursor-pointer"}
            onClick={handleRemove}>
      <TrashIcon className={"w-3 md:w-4"} />
    </button>
  );
}