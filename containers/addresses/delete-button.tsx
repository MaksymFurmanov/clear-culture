"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { deleteAddress } from "@/lib/actions/address";

export default function DeleteButton({ id }: { id: string }) {
  const {back} = useRouter();
  const deleteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteAddress(id);
    back();
  };

  return (
    <button className={"text-lg text-red-500 cursor-pointer hover:text-red-700"}
            onClick={(e) => deleteHandler(e)}>
      Delete address
    </button>
  );
}