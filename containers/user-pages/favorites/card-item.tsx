"use client";

import Image from "next/image";
import TrashIcon from "@/public/img/trash.svg";
import Link from "next/link";

export default function CardItem({ photoUrl, name, productId }: {
  photoUrl: string,
  name: string,
  productId: string
}) {
  return (
    <div
      className={"bg-green text-base md:text-lg flex justify-between items-center gap-4 rounded-lg p-4 mx-6 mb-6"}>
      <div className={"flex gap-4 w-full"}>
        <div className={"bg-light-green rounded aspect-square min-w-17 max-h-fit w-1/4 md:w-1/3 p-3"}>
          <Image className={"w-full h-full object-contain"}
                 src={photoUrl}
                 alt={name}
                 width={100}
                 height={100}
          />
        </div>

        <div>
        <p className={"mb-3"}>
          {name}
        </p>
        <Link className={"bg-dark-blue text-white md:text-base cursor-pointer rounded-md py-1 px-5"}
              href={`/product/${productId.toString()}`}
              target={"_blank"}
        >
          Shop now
        </Link>
      </div>
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
      <TrashIcon className={"w-3 md:w-4"} />
    </button>
  );
}