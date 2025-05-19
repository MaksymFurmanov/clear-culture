'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductVariant } from "@/types/database";

export default function ProductCard({ product }: {
  product: ProductVariant
}) {
  const router = useRouter();

  const buyRoute = () => {
    router.push(`/product/${product.product_id}`);
  };

  return (
    <div className={"grid grid-rows-[auto_1fr_0.5fr] justify-items-center items-center h-full max-w-45"}>
      <div className={"bg-light-green flex justify-center items-center rounded aspect-square w-30 md:w-35 lg:w-40 p-4 mb-3"}>
        <Image className={"w-full h-full object-contain"}
               src={product.photo_url}
               alt={product.name}
               width={80}
               height={80}
        />
      </div>

      <p className={"text-center md:text-base lg:text-lg px-2"}>
        {product.name}
      </p>

      <button className={"bg-dark-blue text-white cursor-pointer rounded-md w-30 py-1 px-5 mt-3"}
              onClick={buyRoute}
      >
        Buy now
      </button>
    </div>
  );
}