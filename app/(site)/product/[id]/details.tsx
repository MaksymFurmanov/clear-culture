'use client';

import { ProductGroup } from "@/types/database";
import ScalingUnderlineLink from "@/components/scaling-underline-link";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export default function Details({ product, descriptionMDX }: {
  product: ProductGroup,
  descriptionMDX?: MDXRemoteSerializeResult
}) {
  const components = useMDXComponents({});

  return (
    <section className={"flex flex-col items-center"}>
      {product?.description && (
        <div className={"products-description"}>
          {descriptionMDX && (
            <div className="products-description">
              <MDXRemote {...descriptionMDX} components={components} />
            </div>
          )}
        </div>
      )}

      {product?.page_url && (
        <ScalingUnderlineLink href={product.page_url}
                              className={"text-lg md:text-xl mt-2 mb-4"}
        >
          More about {product.name.toLowerCase()} →
        </ScalingUnderlineLink>
      )}
    </section>
  );
}