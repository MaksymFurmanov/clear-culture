import { OrderItem } from "@/types/database";
import productsVariants from "@/data/placeholders/productsVariants";
import Image from "next/image";
import { Fragment } from "react";

export default function Item({ item }: {
  item: OrderItem
}) {
  const product = productsVariants
    .find((product) =>
      product.id === item.product_variant_id);

  if (!product) return <Fragment />;

  return (
    <div className={"grid grid-cols-[1fr_3fr] text-base gap-4 max-w-90 mx-4 mb-6"}>
      <div className={"bg-light-green flex justify-center items-center rounded h-30 w-30 p-4"}>
        <Image className={"w-full"}
          src={product.photo_url}
               alt={product.name}
               width={80}
               height={80}
        />
      </div>

      <div className={"flex flex-col justify-between w-full"}>
        <p>
          {product.name}
        </p>
        <div className={"flex justify-between"}>
          <p>
            {item.amount}X
          </p>
          <p>
            {product.price} €
          </p>
        </div>
      </div>
    </div>
  );
}