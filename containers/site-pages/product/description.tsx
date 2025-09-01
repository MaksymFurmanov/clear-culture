'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents } from "@/mdx-components";

export default function Description({descriptionMDX}: {
  descriptionMDX: MDXRemoteSerializeResult | undefined
}) {
  const components = useMDXComponents({});

  return (
    <div className={"products-description"}>
      {descriptionMDX && (
        <MDXRemote {...descriptionMDX} components={components} />
      )}
    </div>
  );
}