import { PageNotFoundError } from "next/dist/shared/lib/utils";
import Configurator from "@/containers/site-pages/product/configurator";
import { Suspense } from "react";

export default async function ProductPage({params}: {
  params: Promise<{productId: string}>
}) {
  const {productId} = await params;
  if (!productId) throw new PageNotFoundError("");

  return (
    <main className={"mx-auto max-w-200"}>
      <Suspense fallback={<p>Loading...</p>}>
        <Configurator productId={productId} />
      </Suspense>
    </main>
  );
}