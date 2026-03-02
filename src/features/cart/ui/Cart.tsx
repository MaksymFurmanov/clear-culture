"use client";

import ListPlaceholder from "@/src/shared/ListPlaceholder";
import { useCart } from "@/src/app/providers/cart-provider";
import CartList from "@/src/features/cart/ui/List";

export default function Cart() {
  const { cartItems, loadingCart } = useCart();

  return (
    loadingCart ? (
      <p>Loading</p>
    ) : (
      cartItems.length === 0 ? (
        <ListPlaceholder message={"The cart is empty"}
                         buttonName={"Shop now"}
                         href={"/catalog/1"}
        />
      ) : (
        <CartList/>
      )
    )
  );
}