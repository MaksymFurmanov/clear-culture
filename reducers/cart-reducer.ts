import { CartItemWithProduct } from "@/types";

type CartAction =
  | { type: "SET", payload: CartItemWithProduct[] }
  | { type: "UPDATE", productId: string; quantity: number }
  | { type: "ADD", item: CartItemWithProduct }
  | { type: "REMOVE", productId: string };

export default function cartReducer(state: CartItemWithProduct[],
                                    action: CartAction) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "UPDATE":
      return state.map(item =>
        item.productId === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      return state.filter(item =>
        item.productId !== action.productId);
    default:
      return state;
  }
}