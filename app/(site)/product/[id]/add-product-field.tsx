'use client';

import AmountAndPrice from "./amount-and-price";
import { useState } from "react";
import Heart from "@/public/img/heart.svg";
import HeartRed from "@/public/img/heart-red.svg";
import { useProductVariants } from "@/providers/product-variants-provider";
import VariantProperties from "@/app/(site)/product/[id]/variant-properties";
import { useCart } from "@/providers/products-in-cart-provider";

export default function AddProductField() {
  const { currVariant } = useProductVariants();
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className={"w-1/2"}>
      <div className={"mb-4"}>
        <h2 className={"text-lg mt-2 mb-2"}>
          {currVariant.name}
        </h2>
        <VariantProperties currVariant={currVariant} />
      </div>

      <AmountAndPrice amount={amount}
                      price={currVariant.price}
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
  const { currVariant } = useProductVariants();
  const { setCartItems, signalAdd } = useCart();

  const addToCart = () => {
    setCartItems((prevState) => {
      const isInCart = prevState.find((cartItem) =>
        cartItem.productVariant.id === currVariant.id);

      if(isInCart) {
        return [...prevState.map(cartItem => {
          if(cartItem.productVariant.id === currVariant.id) {
            return {
              ...cartItem,
              count: cartItem.count + amount
            }
          }

          return cartItem;
        })];
      }

      return [...prevState, {
        productVariant: currVariant,
        count: amount
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