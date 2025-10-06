"use client";

import { useProductGroup } from "@/app/providers/products-by-group-provider";
import { useCart } from "@/app/providers/cart-provider";
import { OrbitProgress } from "react-loading-indicators";

export default function AddToCartButton({ quantity }: {
  quantity: number
}) {
  const { curr } = useProductGroup();
  const { addToCart, loadingCart } = useCart();

  const buttonHandler = async () => {
    await addToCart(curr.id, quantity);
  };

  return (
    <button className={"bg-dark-blue text-white cursor-pointer rounded-md " +
      "w-30 h-8 py-1 px-auto mb-2 disabled:bg-gray-500"}
            onClick={buttonHandler}
            disabled={loadingCart}
    >
      {loadingCart ? (
        <OrbitProgress style={{ fontSize: "4px", marginTop: "0.25em" }}
                       variant="disc"
                       dense
                       color="#000000"
                       size="small"
        />
      ) : "Add to cart"}
    </button>
  );
}