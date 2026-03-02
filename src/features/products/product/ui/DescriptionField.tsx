"use client";

import { ProductGroup } from "@prisma/client";
import dynamic from "next/dynamic";
import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";

const MDXClient = dynamic(() =>
  import("@/src/features/products/product/ui/mdx/mdx-client"), {
  ssr: false
});

export default function DescriptionField({ productGroup }: {
  productGroup: ProductGroup,
}) {
  return (
    <section className={"flex flex-col items-center"}>
      {productGroup.descriptionMdx && (
        <div className={"products-description"}>
          <MDXClient source={productGroup.descriptionMdx} />
        </div>
      )}

      {productGroup?.pageUrl && (
        <ScalingUnderlineBtn href={productGroup.pageUrl}
                              className={"text-lg md:text-xl mt-2 mb-4"}
        >
          More about {productGroup.name.toLowerCase()} →
        </ScalingUnderlineBtn>
      )}
    </section>
  );
}