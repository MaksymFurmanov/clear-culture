"use client";

import { useCart } from "@/app/providers/cart-provider";
import ListPlaceholder from "@/components/list-placeholder";
import CartList from "@/containers/order-pages/cart/list";

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