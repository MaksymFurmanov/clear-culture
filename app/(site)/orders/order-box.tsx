'use client';

import Image from "next/image";
import Circle from "@/public/img/circle.svg";
import { Order, OrderItem } from "@/types/database";
import orderItems from "@/data/placeholders/orderItems";
import productsVariants from "@/data/placeholders/productsVariants";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

const statusColor = {
  "Processing": "#3BDDEF",
  "Processed": "#1e499e",
  "Shipped": "#e899ff",
  "Arrived": "#3dfd17",
  "Canceled": "#ff2d6a"
};

export default function OrderBox({ order }: {
  order: Order
}) {
  const router = useRouter();

  const toOrder = () => {
    router.replace(`/order/${order.id}`);
  }

  const items = orderItems.filter((item) =>
    item.order_id === order.id);

  return (
    <div className={"bg-green rounded-xl border border-gray-400 max-w-80 py-2"}>
      <div className={"flex justify-between px-4"}>
        <p>
          Order: {order.id}
        </p>
        <p>
          {order.created_date}
        </p>
      </div>

      <div className={"w-full border-gray-400 border-b-1 my-2"} />

      {items
        .slice(0, items.length > 1 ? 2 : 1)
        .map((item, index) => (
          <OrderItemCard key={index}
                         item={item}
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
                  style={{ fill: statusColor[order.status] }}
          />
          {order.status}
        </div>
      </div>

      <button className={"block bg-dark-blue text-base text-white cursor-pointer rounded-full py-1 px-12 mb-3 mx-auto"}
              onClick={toOrder}>
        Details
      </button>
    </div>
  );
}

const OrderItemCard = ({ item }: {
  item: OrderItem
}) => {
  const router = useRouter();

  const product = productsVariants.find((product) =>
    product.id === item.product_variant_id);

  if (!product) {
    console.error(`Product with id ${item.product_variant_id} not found`);
    return <Fragment />;
  }

  const toProduct = () => {
    router.push(`/product/${item.product_variant_id}`);
  };

  return (
    <div className={"grid grid-cols-[1fr_3fr_auto] gap-4 py-3 px-4"}>
      <div className={"flex justify-center bg-light-green h-20 w-20 p-2 rounded cursor-pointer"}
           onClick={toProduct}
      >
        <Image className={"w-fit cursor-pointer"}
               src={product.photo_url}
               alt={product.name}
               width={300}
               height={300}
        />
      </div>
      <p className={"cursor-pointer"}
         onClick={toProduct}
      >
        {product.name}
      </p>
      <p className={"mt-auto"}>
        {item.amount}X
      </p>
    </div>
  );
};