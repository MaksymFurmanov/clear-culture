import Image from "next/image";
import { Fragment } from "react";
import { getProductById } from "@/lib/actions/product";

export default async function Item({ productId, amount }: {
  productId: string,
  amount: number
}) {
  const product = await getProductById(productId);

  if (!product) return <Fragment />;

  return (
    <div className={"grid grid-cols-[1fr_3fr] text-base gap-4 max-w-90 mx-4 mb-6"}>
      <div className={"bg-light-green flex justify-center items-center rounded h-30 w-30 p-4"}>
        <Image className={"w-full"}
          src={product.photoUrl}
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
            {amount}X
          </p>
          <p>
            {product.price.toString()} €
          </p>
        </div>
      </div>
    </div>
  );
}