import { serialize } from "next-mdx-remote/serialize";

export const getDescriptionMDX = async (descriptionUrl: string) => {
  const res = await fetch(descriptionUrl, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch MDX from ${descriptionUrl}`);
  const mdxSource = await res.text();
  return await serialize(mdxSource);
};