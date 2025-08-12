import { ProductGroup } from "@/types/database";
import ProductCard from "./product-card";
import { Fragment } from "react";
import { getProductGroups } from "@/lib/db-actions/productGroup";

export default async function ProductCardsList({ page }: {
  page: number
}) {
  const groupsInPage = await getProductGroups((page - 1) * 6, (page - 1) * 6 + 6);

  return (
    <section className={"grid grid-cols-2 align-start justify-items-center gap-y-10 gap-x-6 mb-6"}>
      {groupsInPage.map((productGroup: ProductGroup, index: number) => {
        if (!productGroup.defaultProductId) return <Fragment key={index} />;
        return (
          <ProductCard key={index}
                       groupId={productGroup.id}
                       defaultProductId={productGroup.defaultProductId}
          />
        );
      })}
    </section>
  );
}