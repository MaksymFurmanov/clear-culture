import Configurator from "@/app/(site)/product/[id]/configurator";
import Details from "@/app/(site)/product/[id]/details";
import products from "@/data/placeholders/products";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const productId = params.id;
  if (!productId) throw new PageNotFoundError("");

  const product = products.find(product => product.id === productId);
  if (!product) throw new Error("Product does not exist");

  return (
    <main className={"mx-auto max-w-200"}>
      <Configurator product={product} />
      <Details product={product}/>
    </main>
  );
}