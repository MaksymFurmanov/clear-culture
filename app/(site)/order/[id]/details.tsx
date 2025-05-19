"use client";

import { Order } from "@/types";
import CopyIcon from "@/public/img/copy.svg";

export default function Details({ order }: {
  order: Order
}) {
  const handleCopyOrderNum = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      alert("Text copied to clipboard!");
    } catch (e) {
      console.error("Failed to copy order id", e);
    }
  };

  return (
    <div className={"text-lg mx-4 mb-8"}>
      <div className={"flex gap-3"}>
        <p>
          Order: {order.id}
        </p>
        <button className={"cursor-pointer"}
                onClick={handleCopyOrderNum}
        >
          <CopyIcon />
        </button>
      </div>
      <p>
        Created: {order.created_date}
      </p>
    </div>
  );
}