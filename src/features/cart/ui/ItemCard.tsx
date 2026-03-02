import Image from "next/image";
import Link from "next/link";
import Decimal from "decimal.js";
import { CartItemWithProduct } from "@/src/features/cart/cart.types";
import CountChangeButtons from "@/src/features/cart/ui/CountChangeButtons";
import DeleteBtn from "@/src/features/cart/ui/DeleteBtn";
import { PiPackageBold } from "react-icons/pi";

export default function ItemCard({ cartItem }: {
  cartItem: CartItemWithProduct
}) {
  return (
    <div className={"flex justify-between gap-4 bg-green rounded-xl p-4 mb-8 mx-6"}>
      <Link className={"bg-light-green rounded aspect-square min-w-17 max-h-fit w-2/5 md:w-1/3 p-3"}
            href={`/product/${cartItem.product.groupId}/${cartItem.product.id}`}>
        {cartItem.product.photoUrl ? (
          <Image className={"w-full h-full object-contain"}
                 src={cartItem.product.photoUrl}
                 alt={cartItem.product.name}
                 width={100}
                 height={100}
          />
        ) : (
          <PiPackageBold />
        )}
      </Link>

      <div className={"flex flex-col justify-between gap-4 w-full"}>
        <div className={"flex justify-between"}>
          <Link href={`/product/${cartItem.product.groupId}/${cartItem.product.id}`}>
            <p>
              {cartItem.product.name}
            </p>
          </Link>
          <DeleteBtn productId={cartItem.productId} />
        </div>

        <div className={"flex justify-between"}>
          <CountChangeButtons
            productId={cartItem.product.id}
            count={cartItem.quantity}
          />
          <p>
            {new Decimal(cartItem.product.price)
              .mul(cartItem.quantity).toString()} €
          </p>
        </div>
      </div>
    </div>
  );
}