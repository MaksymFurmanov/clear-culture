import { ProductGroup } from "@/types/database";
import ScalingUnderlineLink from "@/components/scaling-underline-link";
import ReactMarkdown from "react-markdown";

export default function Details({ product }: {
  product: ProductGroup,
}) {
  return (
    <section className={"flex flex-col items-center"}>
      <div className={"products-description"}>
        {product?.description && (
          <ReactMarkdown>
            {product.description}
          </ReactMarkdown>
        )}
      </div>
      {product?.page_url && (
        <ScalingUnderlineLink href={product.page_url}
                              className={"text-lg mt-2 mb-4"}
        >
          More about {product.name.toLowerCase()} →
        </ScalingUnderlineLink>
      )}
    </section>
  );
}