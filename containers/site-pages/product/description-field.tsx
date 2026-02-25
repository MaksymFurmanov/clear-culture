"use client";

import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";
import { ProductGroup } from "@prisma/client";
import dynamic from "next/dynamic";

const MDXClient = dynamic(() =>
  import("@/components/mdx/mdx-client"), {
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
        <ScalingUnderlineLink href={productGroup.pageUrl}
                              className={"text-lg md:text-xl mt-2 mb-4"}
        >
          More about {productGroup.name.toLowerCase()} →
        </ScalingUnderlineLink>
      )}
    </section>
  );
}