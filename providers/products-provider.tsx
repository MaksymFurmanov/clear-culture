'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";
import { ClientProduct } from "@/types/database";


const ProductContext = createContext<{
  curr: ClientProduct,
  setCurr: Dispatch<SetStateAction<ClientProduct>>,
  products: ClientProduct[]
} | undefined>(undefined);

export default function ProductsProvider({
                                                  children,
                                                  products,
                                                  defaultProduct
                                                }: {
  children: ReactNode,
  products: ClientProduct[],
  defaultProduct: ClientProduct
}) {
  const [curr, setCurr] = useState<ClientProduct>(defaultProduct);

  return (
    <ProductContext.Provider value={{ curr, setCurr, products: products }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Error providing the products");
  }
  return context;
};