'use client';

import { useProductVariants } from "@/providers/product-variants-provider";
import Circle from "@/public/img/circle.svg";
import clsx from "clsx";

export default function ColorVariants() {
  const { currVariant, setCurrVariant, variants } = useProductVariants();
  if(variants.length < 2) return null;

  return (
    <div className={"flex justify-start flex-wrap gap-1 lg:gap-2 px-1"}>
      {variants.map((variant) => (
        <Circle key={variant.id}
                style={{ fill: variant.colorHEX }}
                className={clsx("stroke cursor-pointer w-5 md:w-6",
                  currVariant.id === variant.id && "stroke-gray-500",)}
                onClick={() => setCurrVariant(variant)}
        />
      ))}
    </div>
  );
}