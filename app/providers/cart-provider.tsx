"use client";

import {
  createContext, ReactNode,
  useContext, useEffect, useReducer
} from "react";
import { CartItemWithProduct } from "@/types";
import { useSession } from "next-auth/react";
import { superGetProductById } from "@/lib/actions/product";
import {
  createCartItem, createOrUpdateCartItems,
  deleteCartItems, getCartTotalPrice, superGetCartItems, updateCartItem
} from "@/lib/actions/cart-items";
import { Product } from "@prisma/client";
import { loadCart, saveCart } from "@/lib/localStorage/cart";
import { deserialize, serialize } from "@/lib/utils/superjson";
import cartReducer, { initialCartState } from "@/reducers/cart-reducer";
import Decimal from "decimal.js";

const CartContext = createContext<
  {
    cartItems: CartItemWithProduct[],
    totalPrice: string,
    lastItemAddedAt: number,
    loadingCart: boolean,
    loadingTotal: boolean,
    addToCart: (
      productId: string,
      quantity: number,
    ) => Promise<void>,
    updateInCart: (
      productId: string,
      quantity: number,
    ) => void,
    removeFromCart: (productId: string) => void
  }
  | undefined
>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const { data: user } = useSession();
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Sync guest cart to server on login
  useEffect(() => {
    if (!!user?.user?.id) {
      (async () => {
        dispatch({ type: "SET_LOADING_CART", payload: true });
        try {
          const cart = loadCart();
          if (cart.length > 0) {
            await createOrUpdateCartItems(cart, true);
          }
          localStorage.setItem("cart", serialize<CartItemWithProduct[]>([]));
        } finally {
          dispatch({ type: "SET_LOADING_CART", payload: false });
        }
      })();
    }
  }, [user?.user?.id]);

  // Load items (guest from localStorage, logged in from DB)
  useEffect(() => {
    if (!user?.user?.id) {
      dispatch({ type: "SET_ITEMS", payload: loadCart() });
      return;
    }

    (async () => {
      dispatch({ type: "SET_LOADING_CART", payload: true });
      try {
        const dbCartItems = await superGetCartItems();
        dispatch({
          type: "SET_ITEMS",
          payload: deserialize<CartItemWithProduct[]>(dbCartItems)
        });
      } finally {
        dispatch({ type: "SET_LOADING_CART", payload: false });
      }
    })();
  }, [user?.user?.id]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!user?.user?.id) saveCart(state.items);
  }, [state.items, user?.user?.id]);

  // Fetch total price from server whenever items change
  useEffect(() => {
    if (!user?.user?.id) {
      const total = state.items.reduce(
        (sum, item) =>
          sum.add(new Decimal(item.product.price).mul(item.quantity)),
        new Decimal(0)
      ).toString();

      dispatch({ type: "SET_TOTAL_PRICE", payload: total });
      return;
    }

    (async () => {
      dispatch({ type: "SET_LOADING_TOTAL", payload: true });
      try {
        const total = await getCartTotalPrice();
        dispatch({ type: "SET_TOTAL_PRICE", payload: total });
      } finally {
        dispatch({ type: "SET_LOADING_TOTAL", payload: false });
      }
    })();
  }, [state.items]);

  const addToCart = async (
    productId: string,
    quantity: number,
  ) => {
    dispatch({ type: "SET_LOADING_CART", payload: true });
    try {
      if (!!user?.user?.id) await createCartItem(productId, quantity);

      const existing = state.items.find((item) =>
        item.productId === productId);

      console.log(existing)
      if (existing) {
        dispatch({ type: "UPDATE_ITEM", productId, quantity });
      } else {
        const product = deserialize<Product | null>(
          await superGetProductById(productId)
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
        removeFromCart,
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