'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";
import { Product } from "@prisma/client";


const ProductContext = createContext<{
  curr: Product,
  setCurr: Dispatch<SetStateAction<Product>>,
  products: Product[]
} | undefined>(undefined);

export default function ProductsProvider({
                                                  children,
                                                  products,
                                                  defaultProduct
                                                }: {
  children: ReactNode,
  products: Product[],
  defaultProduct: Product
}) {
  const [curr, setCurr] = useState<Product>(defaultProduct);

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