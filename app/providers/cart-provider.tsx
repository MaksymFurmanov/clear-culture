"use client";

import {
  createContext, ReactNode,
  useContext, useReducer
} from "react";
import { CartItemWithProduct } from "@/types";
import { useSession } from "next-auth/react";
import cartReducer, { initialCartState } from "@/reducers/cart-reducer";
import { useSyncGuestCartToServer } from "@/hooks/cart/use-sync-guest-cart-to-server";
import { useLoadCartItems } from "@/hooks/cart/use-load-cart-items";
import { useSaveGuestCart } from "@/hooks/cart/use-save-guest-cart";
import { useCartTotal } from "@/hooks/cart/use-cart-total";
import { getProductByIdForClient } from "@/lib/actions/product";
import { createOrUpdateCartItem, deleteCartItems, updateCartItem } from "@/lib/actions/cart-items";
import { deserialize } from "@/lib/utils/superjson";
import { Product } from "@prisma/client";

const CartContext = createContext<
  {
    cartItems: CartItemWithProduct[],
    totalPrice: string,
    lastItemAddedAt: number,
    loadingCart: boolean,
    loadingTotal: boolean,
    addToCart: (
      productId: string,
      quantity: number
    ) => Promise<void>,
    updateInCart: (
      productId: string,
      quantity: number
    ) => void,
    removeFromCart: (productId: string) => void
  }
  | undefined
>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const { data: user } = useSession();
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const userId = user?.user?.id;

  useSyncGuestCartToServer(userId, dispatch);
  useLoadCartItems(userId, dispatch);
  useSaveGuestCart(userId, state.items);
  useCartTotal(userId, state.items, dispatch);

  const addToCart = async (
    productId: string,
    quantity: number,
  ) => {
    dispatch({ type: "SET_LOADING_CART", payload: true });
    try {
      if (!!user?.user?.id) await createOrUpdateCartItem(productId, quantity);

      const existing = state.items.find((item) =>
        item.productId === productId);

      if (existing) {
        dispatch({ type: "UPDATE_ITEM", productId, quantity });
      } else {
        const product = deserialize<Product | null>(
          await getProductByIdForClient(productId)
        );

        dispatch({
          type: "ADD_ITEM",
          item: { id: "", product, productId, quantity } as CartItemWithProduct
        });
      }

      dispatch({ type: "SET_LAST_ADDED", payload: Date.now() });
    } finally {
      dispatch({ type: "SET_LOADING_CART", payload: false });
    }
  }

  const updateInCart = (
    productId: string,
    quantity: number,
  ) => {
    dispatch({ type: "UPDATE_ITEM", productId, quantity });

    try {
      if (!!user?.user?.id){
        (async () => {
          await updateCartItem(productId, quantity);
        })();
      }
    } catch (e) {
      console.error(e);
    }
  }

  const removeFromCart = (productId: string) => {
    try {
      dispatch({ type: "REMOVE_ITEM", productId });
      if (!!user?.user?.id) (async () => {
        await deleteCartItems(productId);
      })();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        lastItemAddedAt: state.lastItemAddedAt,
        totalPrice: state.totalPrice,
        loadingCart: state.loadingCart,
        loadingTotal: state.loadingTotal,
        addToCart,
        updateInCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Error providing the cart");
  return context;
};