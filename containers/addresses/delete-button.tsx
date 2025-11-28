"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { deleteAddress } from "@/lib/actions/address";
import { useAlerts } from "@/app/providers/alert-provider";

export default function DeleteButton({ id }: { id: string }) {
  const { back } = useRouter();

  const { addAlert } = useAlerts();

  const deleteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await deleteAddress(id);
      addAlert("removing", "Address deleted");
      back();
    } catch (e) {
      if (e instanceof Error) {
        addAlert("error", e.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <button className={"text-lg text-red-500 cursor-pointer hover:text-red-700"}
            onClick={(e) => deleteHandler(e)}>
      Delete address
    </button>
  );
};