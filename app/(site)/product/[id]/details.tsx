import ScalingUnderlineLink from "@/components/scaling-underline-link";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Description from "@/app/(site)/product/[id]/description";
import { getProductGroupById } from "@/lib/db-actions/productGroup";
import { serialize } from "next-mdx-remote/serialize";

export default async function Details({ groupId }: {
  groupId: number,
}) {
  const productGroup = await getProductGroupById(groupId);
  if (!productGroup) throw new Error("Product group does not exist");

  let descriptionMDX: MDXRemoteSerializeResult | undefined = undefined;
  if (productGroup.descriptionUrl) {
    const res = await fetch(productGroup.descriptionUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch MDX file: ${res.statusText}`);
    }
    const mdxSource = await res.text();
    descriptionMDX = await serialize(mdxSource);
  }

  return (
    <section className={"flex flex-col items-center"}>
      {productGroup?.descriptionUrl && (
          <Description descriptionMDX={descriptionMDX}/>
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