"use client";

import {
  createContext, Dispatch, ReactNode, SetStateAction,
  useContext, useEffect, useMemo, useState
} from "react";
import { CartItemWithProduct } from "@/types";
import Decimal from "decimal.js";
import { deserialize, serialize } from "@/lib/utils/superjson";
import { useSession } from "next-auth/react";
import { superGetProductById } from "@/lib/actions/product";
import { deleteCartItems, superCreateOrUpdateCartItem } from "@/lib/actions/cart-items";
import { Product } from "@prisma/client";

const CartContext = createContext<{
  cartItems: CartItemWithProduct[],
  setCartItems: Dispatch<SetStateAction<CartItemWithProduct[]>>,
  addToCartOrUpdate: (productId: string, quantity: number) => Promise<void>,
  removeFromCart: (productId: string) => Promise<void>,
  signalAdd: () => void,
  lastItemAddedAt: number,
  totalPrice: Decimal
} | undefined>(undefined);

export default function CartProvider({ children, dbCartItems }: {
  children: ReactNode,
  dbCartItems: CartItemWithProduct[] | null,
}) {
  const { data: user } = useSession();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [lastItemAddedAt, setLastItemAddedAt] = useState<number>(0);

  const isGuest = !user?.user?.id;

  /*
  * Get products cart from local storage and database if there is
  */
  useEffect(() => {
    if (isGuest) {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCartItems(deserialize<CartItemWithProduct[]>(stored));
      }

      return;
    }

    if (dbCartItems) {
      setCartItems(dbCartItems);
    }
  }, [isGuest, dbCartItems]);

  /*
  * Add products to the cart to database
  */
  const addToCartOrUpdate = async (productId: string, quantity: number) => {
    try {
      if (isGuest) {
        const newItems = deserialize<CartItemWithProduct[]>(
          await superCreateOrUpdateCartItem(productId, quantity)
        );
        setCartItems(newItems);

        return;
      }

      const existingItemIndex = cartItems.findIndex(item =>
        item.productId === productId);

      if (existingItemIndex !== -1) {
        const newItems = [...cartItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity
        };

        setCartItems(newItems);
      } else {
        const product = deserialize<Product | null>(
          await superGetProductById(productId)
        );

        const newItems = [
          ...cartItems,
          {
            id: "",
            product,
            productId,
            quantity
          } as CartItemWithProduct
        ];

        setCartItems(newItems);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /*
  * Save products in cart to local storage
  * */
  useEffect(() => {
    if (!isGuest) {
      localStorage.setItem("cart",
        serialize<CartItemWithProduct[]>(cartItems)
      );
    }
  }, [cartItems, isGuest]);

  const removeFromCart = async (productId: string) => {
    try {
      if (!isGuest) {
        const newItems = await deleteCartItems(productId);
        setCartItems(newItems);

        return;
      }

      const newItems = cartItems.filter(item =>
        item.productId !== productId
      );
      setCartItems(newItems);
    } catch (e) {
      console.error(e);
    }
  };

  /*
  * Function for tracking time when the last item added
  * for the cart button animation
  */
  const signalAdd = () => {
    setLastItemAddedAt(Date.now());
  };

  /*
  * Counting the total cart price for the totalPrice variable
  */
  const totalPrice = useMemo(() => {
    let sum = new Decimal(0);
    if (cartItems.length === 0) return sum;

    cartItems.forEach((cartItem) => {
      sum = sum.add(
        new Decimal(cartItem.product.price)
          .mul(cartItem.quantity)
      );
    });

    return sum;
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems, setCartItems, addToCartOrUpdate,
      signalAdd, lastItemAddedAt, totalPrice, removeFromCart
    }}>
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