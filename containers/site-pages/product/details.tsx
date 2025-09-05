import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getProductGroupById } from "@/lib/actions/product-group";
import Description from "./description";

export default async function Details({ groupId }: {
  groupId: string,
}) {
  const productGroup = await getProductGroupById(groupId);
  if (!productGroup) throw new Error("Product group does not exist");

  let descriptionMDX: MDXRemoteSerializeResult | undefined = undefined;
  if (productGroup.descriptionUrl) {
    try {
      const res = await fetch(productGroup.descriptionUrl);
      const mdxSource = await res.text();
      descriptionMDX = await serialize(mdxSource);
    } catch (error) {
      throw new Error(`Failed to fetch MDX file: ${error}`);
    }
  }

  return (
    <section className={"flex flex-col items-center"}>
      {productGroup?.descriptionUrl && (
        <Description descriptionMDX={descriptionMDX} />
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