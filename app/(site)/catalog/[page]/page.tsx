import { Suspense } from "react";
import Pagination from "@/containers/site-pages/catalog/pagination";
import ProductCardsList from "@/containers/site-pages/catalog/product-cards-list";

export default async function CatalogPage({ params }: {
  params: Promise<{ page: string }>
}) {
  const {page} = await params;
  const pageNumber = Number(page);

  return (
    <main className={"mx-auto max-w-200"}>
      <h1 className={"text-2xl md:text-3xl lg:text-4xl text-center my-8 md:my-12 lg:my-16"}>
        Product catalog
      </h1>
      <Suspense fallback={<p>Loading</p>}>
        <Pagination page={pageNumber} />
      </Suspense>
      <Suspense fallback={<p>Loading</p>}>
        <ProductCardsList page={pageNumber} />
      </Suspense>
    </main>
  );
}