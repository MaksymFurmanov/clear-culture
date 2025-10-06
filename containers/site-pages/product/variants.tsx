"use client";

import Image from "next/image";
import ColorVariants from "./color-variants";
import { useProductGroup } from "@/app/providers/products-by-group-provider";

export default function Variants() {
  const { curr } = useProductGroup();

  return (
    <div className={"w-1/3 md:w-1/4"}>
      <div className={"bg-light-green rounded w-full aspect-square p-2 mb-3"}>
        <Image className={"w-full"}
               src={curr.photoUrl}
               alt={curr.name}
               width={100}
               height={100}
        />
      </div>
      {curr.color && (
        <ColorVariants />
      )}
    </div>
  );
}