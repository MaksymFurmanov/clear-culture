'use client';

import AddProductField from "./add-product-field";
import Variants from "./variants";
import { ProductGroup } from "@/types/database";
import productsVariants from "@/data/placeholders/productsVariants";
import ProductVariantsProvider from "@/providers/product-variants-provider";

export default function Configurator({ product }: {
  product: ProductGroup,
}) {
  const allVariants = productsVariants.filter((productVariant) =>
    productVariant.product_id === product.id);

  const classicVariant = allVariants.find(variant =>
    variant.id === product.classic_variant_id);
  if (!classicVariant) throw new Error("Error in loading the page");

  return (
    <section className={"flex justify-around gap-3 mt-8 mb-4 mx-4"}>
      <ProductVariantsProvider variants={allVariants} classicVariant={classicVariant}>
        <Variants />
        <AddProductField />
      </ProductVariantsProvider>
    </section>
  );
}