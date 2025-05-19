'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types";

const CartContext = createContext<{
  cartItems: CartItem[],
  setCartItems: Dispatch<SetStateAction<CartItem[]>>,
  signalAdd: () => void,
  lastItemAddedAt: number
} | undefined>(undefined);

export default function CartProvider({
                                                        children
                                                      }: {
  children: ReactNode
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastItemAddedAt, setLastItemAddedAt] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const signalAdd = () => {
    setLastItemAddedAt(Date.now());
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, signalAdd, lastItemAddedAt }}>
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