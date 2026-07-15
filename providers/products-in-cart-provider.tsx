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

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        } else {
          localStorage.removeItem("cart");
        }
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
        localStorage.removeItem("cart");
      }
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isInitialized]);

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