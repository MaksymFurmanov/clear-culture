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

  const routeAdress = () => {
    router.replace("/new-adress");
  }

  return (
    <div className={"text-base md:text-lg lg:text-xl"}>
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
              onClick={routeAdress}
      >
        Confirm
      </button>
    </div>
  );
}