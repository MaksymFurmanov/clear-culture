'use client';

import { CartItem } from "@/types";
import Image from "next/image";
import Trash from "@/public/img/trash.svg";
import { useCart } from "@/providers/products-in-cart-provider";
import Link from "next/link";
import CountChangeButtons from "@/app/(new-order)/cart/count-change-buttons";

export default function ItemCard({ product, index }: {
  product: CartItem,
  index: number
}) {

  return (
    <div className={"flex justify-between gap-4 bg-green rounded-xl p-4 mb-8 mx-6"}>
      <Link className={"bg-light-green rounded aspect-square w-2/5 p-3"}
            href={`/product/${product.productVariant.product_id}`}>
        <Image className={"w-full h-full object-contain"}
               src={product.productVariant.photo_url}
               alt={product.productVariant.name}
               width={100}
               height={100}
        />
      </Link>
      <div className={"flex flex-col justify-between gap-4 w-full"}>
        <div className={"flex justify-between"}>
          <Link href={`/product/${product.productVariant.product_id}`}>
            <p>
              {product.productVariant.name}
            </p>
          </Link>
          <DeleteButton index={index} />
        </div>
        <div className={"flex justify-between"}>
          <CountChangeButtons
            index={index}
            count={product.count}
          />
          <p>
            {product.productVariant.price * product.count} €
          </p>
        </div>
      </div>
    </div>
  );
}

function DeleteButton({ index }: {
  index: number
}) {
  const { setCartItems } = useCart();

  const deleteHandler = () => {
    setCartItems((prevState) => {
      return [
        ...prevState.filter((_, i) => i !== index)
      ];
    });
  };

  return (
    <button className={"cursor-pointer h-fit m-1"}
            onClick={deleteHandler}>
      <Trash className={"w-3 lg:w-4"} />
    </button>
  );
}