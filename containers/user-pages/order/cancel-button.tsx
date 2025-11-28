"use client";

import { cancelOrder } from "@/lib/actions/order";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useAlerts } from "@/app/providers/alert-provider";

export default function CancelButton({ orderId }: {
  orderId: string,
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const { addAlert } = useAlerts();

  const cancelHandler = async () => {
    try {
      setLoading(true);
      await cancelOrder(orderId);
      addAlert("warning", "Order canceled");
    } catch (e) {
      if (e instanceof Error) {
        addAlert("error", e.message);
      } else {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={"block bg-dark-blue text-base text-white cursor-pointer rounded-full py-1 px-8 mt-3 mr-6 ml-auto mb-8"}
      onClick={cancelHandler}
    >
      {loading
        ? <OrbitProgress style={{ fontSize: "4px", marginTop: "1em" }}
                         variant="disc"
                         dense
                         color="#ffffff"
                         size="small"
        />
        : "Cancel"}
    </button>
  );
}