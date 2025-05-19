'use client';

import { ProductVariant } from "@/types/database";
import Image from "next/image";
import TrashIcon from "@/public/img/trash.svg";
import Link from "next/link";

export default function FavoriteProduct({ productVariant }: {
  productVariant: ProductVariant
}) {

  return (
    <div
      className={"bg-green text-base md:text-lg lg:text-xl grid grid-cols-[1fr_2fr_auto] justify-between items-center gap-4 md:gap-6 rounded-lg p-4 mx-6 mb-6"}>
      <div className={"bg-light-green rounded aspect-square w-full p-3"}>
        <Image className={"w-full"}
               src={productVariant.photo_url}
               alt={productVariant.name}
               width={100}
               height={100}
        />
      </div>

      <div>
        <p className={"mb-3"}>
          {productVariant.name}
        </p>
        <Link className={"bg-dark-blue text-white md:text-base lg:text-lg cursor-pointer rounded-md py-1 px-5"}
              href={`/product/${productVariant.id}`}
              target={"_blank"}
        >
          Shop now
        </Link>
      </div>

      <RemoveButton />
    </div>
  );
}

function RemoveButton() {
  const handleRemove = () => {

  };

  return (
    <button className={"mr-2 w-4 cursor-pointer"}
            onClick={handleRemove}>
      <TrashIcon className={"w-3 lg:w-4"} />
    </button>
  );
}