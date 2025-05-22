'use client';

import Image from "next/image";
import ColorVariants from "./color-variants";
import { useProductVariants } from "@/providers/product-variants-provider";

export default function Variants() {
  const {currVariant} = useProductVariants();

  return (
    <div className={"w-1/3 md:w-1/4"}>
      <div className={"bg-light-green rounded w-full aspect-square p-2 mb-3"}>
        <Image className={"w-full"}
          src={currVariant.photo_url}
               alt={currVariant.name}
               width={100}
               height={100}
        />
      </div>
      {currVariant.color && (
        <ColorVariants />
      )}
    </div>
  );
}