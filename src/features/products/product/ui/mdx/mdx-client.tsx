"use client";

import { MDXRemote } from "next-mdx-remote";
import { useMDXComponents } from "@/src/features/products/product/ui/mdx/mdx-components";

export default function MDXClient({ source }: { source: any }) {
  const components = useMDXComponents({});
  return (
    <MDXRemote {...source} components={components} />
  );
}