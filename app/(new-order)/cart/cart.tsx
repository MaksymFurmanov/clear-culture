'use state';

import { useRouter } from "next/navigation";
import { useCart } from "@/providers/products-in-cart-provider";
import ItemCard from "@/app/(new-order)/cart/item-card";

export default function Cart() {
  const { cartItems } = useCart();
  const router = useRouter();

  let sum = 0;
  cartItems.map((cartItem) => {
    sum += cartItem.productVariant.price * cartItem.count;
  });

  return cartItems.length === 0 ? (
    <div className={"flex flex-col gap-2 items-center justify-center h-[50dvh]"}>
      <p className={"text-xl md:text-2xl text-gray-500"}>
        The cart is empty
      </p>
      <button className={"block bg-dark-blue text-white md:text-lg cursor-pointer rounded-full py-1 px-12 mt-3 mx-auto mb-8"}
      onClick={() => {router.replace("/catalog/1")}}>
        Shop now
      </button>
    </div>
  ) : (
    <div className={"text-base md:text-lg"}>
      {cartItems.map((cartItem, index) => (
        <ItemCard key={index}
                  product={cartItem}
                  index={index}
        />
      ))}
      <div className={"flex justify-between rounded-xl bg-green px-6 py-3 mx-6 mb-8"}>
        <p>
          Sum:
        </p>
        <p>
          {sum} €
        </p>
      </div>
      <button className={"block bg-dark-blue text-white cursor-pointer rounded-full py-1 px-12 mt-3 mx-auto mb-8"}
              onClick={() => {router.replace("/new-adress")}}
      >
        Confirm
      </button>
    </div>
  );
}