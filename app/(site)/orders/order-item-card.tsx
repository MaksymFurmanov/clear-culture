import { getProductById } from "@/lib/db-actions/product";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

export default async function OrderItemCard({ productId, amount }: {
  productId: number,
  amount: number
}) {
  const product = await getProductById(productId);

  if (!product) {
    console.error(`Product with id ${productId} not found`);
    return <Fragment />;
  }

  return (
    <div className={"grid grid-cols-[1fr_3fr_auto] gap-4 py-3 px-4"}>
      <Link href={`/product/${productId}`}>
        <div className={"flex justify-center bg-light-green h-20 w-20 p-2 rounded cursor-pointer"}>
          <Image className={"w-fit cursor-pointer"}
                 src={product.photoUrl}
                 alt={product.name}
                 width={300}
                 height={300}
          />
        </div>
      </Link>
      <Link href={`/product/${productId}`}>
        <p className={"cursor-pointer"}>
          {product.name}
        </p>
      </Link>
      <p className={"mt-auto"}>
        {amount}X
      </p>
    </div>
  );
};