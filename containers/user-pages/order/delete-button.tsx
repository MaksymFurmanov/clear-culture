"use client";

import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useRouter } from "next/navigation";
import { deleteOrder } from "@/lib/actions/order";
import { useAlerts } from "@/app/providers/alert-provider";

export default function DeleteButton({ orderId }: {
  orderId: string
}) {
  const [loading, setLoading] = useState(false);
  const {push} = useRouter();

  const {addAlert} = useAlerts();

  const deleteHandler = async () => {
    try {
      setLoading(true);
      await deleteOrder(orderId);
      addAlert("success", "Order deleted");
      push("/orders");
    } catch (e) {
      if(e instanceof Error) {
        addAlert("removing", e.message);
      } else {
        console.error(e);
      }
    }finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={"block bg-dark-blue text-base text-white cursor-pointer rounded-full py-1 px-8 mt-3 mr-6 ml-auto mb-8"}
      onClick={deleteHandler}
    >
      {loading
        ? <OrbitProgress style={{ fontSize: "4px", marginTop: "1em" }}
                         variant="disc"
                         dense
                         color="#ffffff"
                         size="small"
        />
        : "Delete"}
    </button>
  );
}