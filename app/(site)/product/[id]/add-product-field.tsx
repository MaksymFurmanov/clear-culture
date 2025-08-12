'use client';

import AmountAndPrice from "./amount-and-price";
import { useState } from "react";
import Heart from "@/public/img/heart.svg";
import HeartRed from "@/public/img/heart-red.svg";
import { useProducts } from "@/providers/products-provider";
import ProductProperties from "@/app/(site)/product/[id]/product-properties";
import { useCart } from "@/providers/products-in-cart-provider";

export default function AddProductField() {
  const { curr } = useProducts();
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className={"w-1/2"}>
      <div className={"mb-4"}>
        <h2 className={"text-lg mt-2 mb-2"}>
          {curr.name}
        </h2>
        <ProductProperties color={curr.color} />
      </div>

      <AmountAndPrice amount={amount}
                      price={curr.price}
                      changeAmount={setAmount}
      />

      <AddToCartButton amount={amount}/>

      <AddToFavoritesButton />
    </div>
  );
}

function AddToCartButton ({amount}: {
  amount: number
}) {
  const { curr } = useProducts();
  const { setCartItems, signalAdd } = useCart();

  const addToCart = () => {
    setCartItems((prevState) => {
      const isInCart = prevState.find((cartItem) =>
        cartItem.product.id === curr.id);

      if(isInCart) {
        return [...prevState.map(cartItem => {
          if(cartItem.product.id === curr.id) {
            return {
              ...cartItem,
              amount: cartItem.amount + amount
            }
          }

          return cartItem;
        })];
      }

      return [...prevState, {
        product: curr,
        amount: amount
      }];
    });

    signalAdd();
  };
  return (
    <button className={"bg-dark-blue text-white cursor-pointer rounded-md py-1 px-5 mb-2"}
            onClick={addToCart}
    >
      Add to cart
    </button>
  );
}

function AddToFavoritesButton() {
  const [fav, setFav] = useState<boolean>(false);

  const addToFavorites = () => {
    setFav(!fav);
  };

  return (
    <button className={"cursor-pointer flex items-center gap-2"}
            onClick={addToFavorites}
    >
      {fav ? (
        <HeartRed />
      ) : (
        <Heart />
      )}
      <p>
        Add to favorites
      </p>
    </button>
  );
}