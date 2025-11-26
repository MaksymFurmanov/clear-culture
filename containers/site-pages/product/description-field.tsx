"use client";

import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";
import { ProductGroup } from "@prisma/client";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";

const MDXClient = dynamic(() =>
  import("@/components/mdx/mdx-client"), {
  ssr: false
});

export default function DescriptionField({ productGroup, descriptionMDX }: {
  productGroup: ProductGroup,
  descriptionMDX: MDXRemoteSerializeResult | undefined
}) {
  return (
    <section className={"flex flex-col items-center"}>
      {descriptionMDX && (
        <div className={"products-description"}>
          <MDXClient source={descriptionMDX} />
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