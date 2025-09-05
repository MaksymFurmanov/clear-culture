"use client";

import { useSession } from "next-auth/react";
import { deleteFavoriteProductFromUser } from "@/lib/actions/favorite-product";
import TrashIcon from "@/public/img/trash.svg";

export default function RemoveButton({productId}: {productId: string}) {
  const {data} = useSession();
  const userId = data?.user?.id;

  const handleRemove = async () => {
    if(!userId) throw new Error("Authorization error");
    await deleteFavoriteProductFromUser(userId, productId);
  };

  return (
    <button className={"mr-2 w-4 cursor-pointer"}
            onClick={handleRemove}>
      <TrashIcon className={"w-3 md:w-4"} />
    </button>
  );
}