import { ProductGroup } from "@/types/database";
import ProductCard from "./product-card";
import productsVariants from "@/data/placeholders/productsVariants";
import { Fragment } from "react";

export default function ProductCardsList({ productGroups }: {
  productGroups: ProductGroup[]
}) {
  return (
    <section className={"grid grid-cols-2 align-start justify-items-center gap-y-10 gap-x-6 mb-6"}>
      {productGroups.map((product: ProductGroup, index: number) => {
        const classicProductVariant = productsVariants.find(variant =>
          variant.id === product.classic_variant_id);
        if (!classicProductVariant) return <Fragment key={index} />;

        return (
          <ProductCard key={index}
                       product={classicProductVariant}
          />
        );
      })}
    </section>
  );
}