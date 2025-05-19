'use client';


import Cart from "@/app/(new-order)/cart/cart";

export default function CartPage() {
  return (
    <main className={"max-w-150 mx-auto"}>
      <h1 className={"text-3xl lg:text-4xl m-8 mt-10"}>
        Your cart
      </h1>
      <Cart />
    </main>
  );
}