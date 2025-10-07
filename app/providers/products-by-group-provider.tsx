"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext, useEffect,
  useState
} from "react";
import { Product } from "@prisma/client";
import { deserialize } from "@/lib/utils/superjson";
import { usePathname, useRouter } from "next/navigation";

const ProductContext = createContext<{
  curr: Product,
  setCurr: Dispatch<SetStateAction<Product>>,
  products: Product[]
} | undefined>(undefined);

export default function ProductsByGroupProvider({
                                                  children,
                                                  superProducts,
                                                  superSelectedProduct
                                                }: {
  children: ReactNode,
  superProducts: string,
  superSelectedProduct: string
}) {
  const {replace} = useRouter();
  const pathname = usePathname();

  const products = deserialize<Product[]>(superProducts);
  const selectedProduct = deserialize<Product>(superSelectedProduct);

  const [curr, setCurr] = useState<Product>(selectedProduct);

  useEffect(() => {
    if (curr?.id && pathname !== `/product/${curr.groupId}/${curr.id}`) {
      replace(`/product/${curr.groupId}/${curr.id}`);
    }
  }, [curr, replace, pathname]);

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