'use client';

import CopyIcon from "@/public/img/copy.svg";

export default function Details({ orderId, createdDate }: {
  orderId: number,
  createdDate: string
}) {
  const handleCopyOrderNum = async () => {
    try {
      await navigator.clipboard.writeText(orderId.toString());
      alert("Text copied to clipboard!");
    } catch (e) {
      console.error("Failed to copy order id", e);
    }
  };

  return (
    <div className={"text-lg mx-4 mb-8"}>
      <div className={"flex gap-3"}>
        <p>
          Order: {orderId.toString()}
        </p>
        <button className={"cursor-pointer"}
                onClick={handleCopyOrderNum}
        >
          <CopyIcon />
        </button>
      </div>
      <p>
        Created: {createdDate}
      </p>
    </div>
  );
}