'use client';

import { useProducts } from "@/providers/products-provider";
import Circle from "@/public/img/circle.svg";
import clsx from "clsx";

export default function ColorVariants() {
  const { curr, setCurr, products } = useProducts();
  if(products.length < 2) return null;

  return (
    <div className={"flex justify-start flex-wrap gap-1 lg:gap-2 px-1"}>
      {products.map((product) => (
        <Circle key={product.id}
                style={{ fill: product.colorHEX }}
                className={clsx("stroke cursor-pointer w-5 md:w-6",
                  curr.id === product.id && "stroke-gray-500",)}
                onClick={() => setCurr(product)}
        />
      ))}
    </div>
  );
}