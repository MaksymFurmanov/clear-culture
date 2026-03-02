import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/src/lib/actions/product";
import { PiPackage } from "react-icons/pi";

export default async function OrderItemCard({ productId, quantity }: {
  productId: string,
  quantity: number
}) {
  const product = await getProductById(productId);

  if (!product) {
    console.error(`Product with id ${productId} not found`);
    return <Fragment />;
  }

  return (
    <div className={"grid grid-cols-[1fr_3fr_auto] gap-4 py-3 px-4"}>
      <Link href={`/product/${product.groupId}/${productId}`}>
        <div className={"flex justify-center bg-light-green h-20 w-20 p-2 rounded cursor-pointer"}>
          {product.photoUrl ? (
            <Image className={"w-fit cursor-pointer"}
                   src={product.photoUrl}
                   alt={product.name}
                   width={300}
                   height={300}
            />
          ) : (
            <PiPackage />
          )}
        </div>
      </Link>
      <Link href={`/product/${product.groupId}/${productId}`}>
        <p className={"cursor-pointer"}>
          {product.name}
        </p>
      </Link>
      <p className={"mt-auto"}>
        {quantity}X
      </p>
    </div>
  );
};