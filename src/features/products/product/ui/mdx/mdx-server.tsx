import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/src/features/products/product/ui/mdx/mdx-components";

export default function MDXServer({ source }: { source: string }) {
  const components = useMDXComponents({});

  return <MDXRemote source={source} components={components} />;
}