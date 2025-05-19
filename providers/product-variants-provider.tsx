'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";
import { ProductVariant } from "@/types";

const ProductVariantsContext = createContext<{
  currVariant: ProductVariant,
  setCurrVariant: Dispatch<SetStateAction<ProductVariant>>,
  variants: ProductVariant[]
} | undefined>(undefined);

export default function ProductVariantsProvider({
                                                  children,
                                                  variants,
                                                  classicVariant
                                                }: {
  children: ReactNode,
  variants: ProductVariant[],
  classicVariant: ProductVariant
}) {
  const [currVariant, setCurrVariant] = useState<ProductVariant>(classicVariant);

  return (
    <ProductVariantsContext.Provider value={{ currVariant, setCurrVariant, variants }}>
      {children}
    </ProductVariantsContext.Provider>
  );
}

export const useProductVariants = () => {
  const context = useContext(ProductVariantsContext);
  if (!context) {
    throw new Error("Error providing the product variants");
  }
  return context;
};