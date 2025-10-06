"use client";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";

const MDXClient = dynamic(() =>
  import("@/components/mdx-client"), {
  ssr: false
});

export default function Description({ descriptionMDX }: {
  descriptionMDX: MDXRemoteSerializeResult | undefined
}) {
  return (
    <div className={"products-description"}>
      {descriptionMDX && <MDXClient source={descriptionMDX} />}
    </div>
  );
}