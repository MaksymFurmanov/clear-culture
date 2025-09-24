"use client";

import {
  createContext, ReactNode,
  useContext, useEffect, useMemo, useReducer, useState
} from "react";
import { CartItemWithProduct } from "@/types";
import Decimal from "decimal.js";
import { useSession } from "next-auth/react";
import { superGetProductById } from "@/lib/actions/product";
import {
  createOrUpdateCartItem,
  deleteCartItems
} from "@/lib/actions/cart-items";
import { Product } from "@prisma/client";
import { loadCart, saveCart } from "@/lib/localStorage/cart";
import { deserialize } from "@/lib/utils/superjson";
import cartReducer from "@/reducers/cart-reducer";

const CartContext = createContext<
  {
    cartItems: CartItemWithProduct[],
    totalPrice: Decimal,
    lastItemAddedAt: number,
    addToCartOrUpdate: (productId: string,
                        quantity: number,
                        increment?: boolean) => Promise<void>,
    removeFromCart: (productId: string) => Promise<void>
  }
  | undefined
>(undefined);

export default function CartProvider({ children, dbCartItems }: {
  children: ReactNode,
  dbCartItems: CartItemWithProduct[] | null,
}) {
  const { data: user } = useSession();
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [lastItemAddedAt, setLastItemAddedAt] = useState<number>(0);

  const isGuest = !user?.user?.id;

  useEffect(() => {
    if (isGuest) {
      dispatch({ type: "SET", payload: loadCart() });
    } else if (dbCartItems) {
      dispatch({ type: "SET", payload: dbCartItems });
    }
  }, [isGuest, dbCartItems]);

  useEffect(() => {
    if (isGuest) saveCart(cartItems);
  }, [cartItems, isGuest]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum
        .add(new Decimal(item.product.price).mul(item.quantity)),
      new Decimal(0)
    );
  }, [cartItems]);

  const addToCartOrUpdate = async (
    productId: string,
    quantity: number,
    increment?: boolean
  ) => {
    if (!isGuest) await createOrUpdateCartItem(productId, quantity, increment);

    const existing = cartItems.find(item =>
      item.productId === productId);
    if (existing) {
      dispatch({ type: "UPDATE", productId, quantity });
    } else {
      const product = deserialize<Product | null>(
        await superGetProductById(productId)
      );
      dispatch({
        type: "ADD",
        item: { id: "", product, productId, quantity } as CartItemWithProduct
      });
    }

    setLastItemAddedAt(Date.now());
  };

  const removeFromCart = async (productId: string) => {
    if (!isGuest) await deleteCartItems(productId);
    dispatch({ type: "REMOVE", productId });
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCartOrUpdate, removeFromCart,
      lastItemAddedAt, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Error providing the cart");
  return context;
};