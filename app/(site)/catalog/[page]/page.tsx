import ProductCardsList from "./product-cards-list";
import products from "@/data/placeholders/products";
import Pagination from "@/app/(site)/catalog/[page]/pagination";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default async function CatalogPage({ params }: {
  params: Promise<{ page: string }>
}) {
  const pageParams = await params;
  const page = Number(pageParams.page);
  const pageAmount = Math.ceil(products.length / 6);
  if (page > pageAmount) throw new PageNotFoundError("Page in catalog not found");

  const productGroups = products.slice((page - 1) * 6, (page - 1) * 6 + 6);

  return (
    <main className={"mx-auto max-w-200"}>
      <h1 className={"text-2xl md:text-3xl lg:text-4xl text-center my-8 md:my-12 lg:my-16"}>
        Product catalog
      </h1>
      <Pagination page={page} pageAmount={pageAmount} />
      <ProductCardsList productGroups={productGroups} />
    </main>
  );
}