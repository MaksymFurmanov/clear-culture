"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types";
import Decimal from "decimal.js";
import { deserialize, serialize } from "@/lib/utils/superjson";

const CartContext = createContext<{
  cartItems: CartItem[],
  setCartItems: Dispatch<SetStateAction<CartItem[]>>,
  signalAdd: () => void,
  lastItemAddedAt: number,
  totalPrice: Decimal
} | undefined>(undefined);

export default function CartProvider({ children }: {
  children: ReactNode
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastItemAddedAt, setLastItemAddedAt] = useState<number>(0);

  /*
  * Get products cart from local storage if there is
  */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItems(deserialize<CartItem[]>(stored));
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
      }
    }
  }, []);

  /*
  * Save products cart to local storage
  * */
  useEffect(() => {
    localStorage.setItem("cart", serialize<CartItem[]>(cartItems));
  }, [cartItems]);

  /*
  * Function for tracking time when the last item added
  * for the cart button animation
  * */
  const signalAdd = () => {
    setLastItemAddedAt(Date.now());
  };

  /*
  * Counting the total cart price for the totalPrice variable
  * */
  let totalPrice = new Decimal(0);
  cartItems.forEach((cartItem) => {
    totalPrice = totalPrice.add((new Decimal(cartItem.product.price).mul(cartItem.amount)));
  });

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, signalAdd, lastItemAddedAt, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Error providing the cart");
  }
  return context;
};