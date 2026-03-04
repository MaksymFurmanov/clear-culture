"use client";

import TrashIcon from "@/public/svg/trash.svg";
import { deleteFavoriteProduct } from "@/src/lib/actions/favorites";

export default function RemoveBtn({productId}: {productId: string}) {
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