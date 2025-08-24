import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/actions/product";

export default async function ProductCard({ groupId, defaultProductId }: {
  groupId: string,
  defaultProductId: string
}) {
  const defaultProduct = await getProductById(defaultProductId);
  if(!defaultProduct) throw new Error(`No default product with id ${defaultProductId} found`);

  return (
    <div className={"grid grid-rows-[auto_1fr_0.5fr] justify-items-center items-center h-full max-w-45"}>
      <Link href={`/product/${groupId.toString()}`}>
        <div
          className={"bg-light-green cursor-pointer flex justify-center items-center rounded aspect-square w-30 md:w-35 lg:w-40 p-4 mb-3"}
        >
          <Image className={"w-full h-full object-contain"}
                 src={defaultProduct.photoUrl}
                 alt={defaultProduct.name}
                 width={80}
                 height={80}
          />
        </div>
      </Link>

      <Link href={`/product/${groupId.toString()}`}>
      <p className={"text-center cursor-pointer md:text-base lg:text-lg px-2"}>
        {defaultProduct.name}
      </p>
      </Link>

      <Link href={`/product/${groupId.toString()}`}
        className={"bg-dark-blue text-white cursor-pointer rounded-md py-1 px-8 mt-3"}
      >
        Buy now
      </Link>
    </div>
  );
}