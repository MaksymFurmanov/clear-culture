"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";
import { Product } from "@prisma/client";
import { deserialize } from "@/lib/utils/superjson";

const ProductContext = createContext<{
  curr: Product,
  setCurr: Dispatch<SetStateAction<Product>>,
  products: Product[]
} | undefined>(undefined);

export default function ProductsByGroupProvider({
                                                  children,
                                                  superProducts,
                                                  superDefaultProduct
                                                }: {
  children: ReactNode,
  superProducts: string,
  superDefaultProduct: string
}) {
  const products = deserialize<Product[]>(superProducts);
  const defaultProduct = deserialize<Product>(superDefaultProduct);

  const [curr, setCurr] = useState<Product>(defaultProduct);

  return (
    <ProductContext.Provider value={{ curr, setCurr, products }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductGroup = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Error providing the products");
  }
  return context;
}