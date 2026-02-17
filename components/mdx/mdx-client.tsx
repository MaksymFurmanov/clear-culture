"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMDXComponents } from "@/components/mdx/mdx-components";

export default function MDXClient({ source }: { source: MDXRemoteSerializeResult }) {
  const components = useMDXComponents({});
  return (
    <MDXRemote {...source} components={components} />
  );
}
