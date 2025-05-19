'use client';

import Image from "next/image";
import ColorVariants from "./color-variants";
import { useProductVariants } from "@/providers/product-variants-provider";

export default function Variants() {
  const {currVariant} = useProductVariants();

  return (
    <div>
      <div className={"bg-light-green rounded max-w-fit p-2 mb-3"}>
        <Image src={currVariant.photo_url}
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