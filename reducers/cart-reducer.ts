import { CartItemWithProduct } from "@/types";

export type CartState = {
  items: CartItemWithProduct[];
  loadingCart: boolean;
  loadingTotal: boolean;
  totalPrice: string;
  lastItemAddedAt: number;
};

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItemWithProduct[] }
  | { type: "UPDATE_ITEM"; productId: string; quantity: number }
  | { type: "ADD_ITEM"; item: CartItemWithProduct }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "SET_LOADING_CART"; payload: boolean }
  | { type: "SET_LOADING_TOTAL"; payload: boolean }
  | { type: "SET_TOTAL_PRICE"; payload: string }
  | { type: "SET_LAST_ADDED"; payload: number };

export const initialCartState: CartState = {
  items: [],
  loadingCart: true,
  loadingTotal: true,
  totalPrice: "0",
  lastItemAddedAt: 0,
};

export default function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.productId),
      };
    case "SET_LOADING_CART":
      return { ...state, loadingCart: action.payload };
    case "SET_LOADING_TOTAL":
      return { ...state, loadingTotal: action.payload };
    case "SET_TOTAL_PRICE":
      return { ...state, totalPrice: action.payload };
    case "SET_LAST_ADDED":
      return { ...state, lastItemAddedAt: action.payload };
    default:
      return state;
  }
}