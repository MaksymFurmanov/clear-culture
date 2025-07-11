import Configurator from "@/app/(site)/product/[id]/configurator";
import Details from "@/app/(site)/product/[id]/details";
import products from "@/data/placeholders/products";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import fs from "fs/promises";
import path from "path";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const productId = params.id;
  if (!productId) throw new PageNotFoundError("");

  const product = products.find(product => product.id === productId);
  if (!product) throw new Error("Product does not exist");

  let descriptionMDX: MDXRemoteSerializeResult | undefined = undefined;
  if (product.description) {
    /*const filePath = path.join(
      process.cwd(),
      product.description
    );*/
    const filePath = product.description;
    const source = await fs.readFile(filePath, "utf8");

    descriptionMDX = await serialize(source);
  }

  return (
    <main className={"mx-auto max-w-200"}>
      <Configurator product={product} />
      <Details product={product} descriptionMDX={descriptionMDX} />
    </main>
  );
}