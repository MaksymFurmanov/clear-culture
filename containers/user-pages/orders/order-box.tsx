import Circle from "@/public/img/circle.svg";
import OrderItemCard from "@/containers/pages/orders/order-item-card";
import Link from "next/link";
import { getOrderItems } from "@/lib/actions/orderItem";
import { Order } from "@prisma/client";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processing":
      return "#3BDDEF";
    case "Processed":
      return "#1e499e";
    case "Shipped":
      return "#e899ff";
    case "Arrived":
      return "#3dfd17";
    case "Canceled":
      return "#ff2d6a";
    default:
      return "#000000";
  }
};

export default async function OrderBox({ order }: {
  order: Order
}) {
  const items = await getOrderItems(order.id);

  return (
    <div className={"bg-green rounded-xl border border-gray-400 max-w-80 py-2"}>
      <div className={"flex justify-between px-4"}>
        <p>
          Order: {order.id}
        </p>
        <p>
          {order.createdDate.toDateString()}
        </p>
      </div>

      <div className={"w-full border-gray-400 border-b-1 my-2"} />

      {items
        .slice(0, items.length > 1 ? 2 : 1)
        .map((item, index) => (
          <OrderItemCard key={index}
                         productId={item.productId}
                         amount={item.amount}
          />
        ))
      }

      <div className={"flex justify-between mx-5 mt-4 mb-5"}>
        {items.length > 2 ? (
          <p className={"text-base"}>
            {items.length - 2} more
          </p>
        ) : (
          <div />
        )}

        <div className={"flex gap-2 text-base"}>
          <Circle className={"w-3"}
                  style={{ fill: getStatusColor(order.status) }}
          />
          {order.status}
        </div>
      </div>

      <Link href={`/containers/user-pages/order/${order.id}`}>
        <button
          className={"block bg-dark-blue text-base text-white cursor-pointer rounded-full py-1 px-12 mb-3 mx-auto"}
        >
          Details
        </button>
      </Link>
    </div>
  );
}