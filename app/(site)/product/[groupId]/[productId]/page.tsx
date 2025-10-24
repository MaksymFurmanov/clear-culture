import Configurator from "@/containers/site-pages/product/configurator";
import { Suspense } from "react";

export default async function ProductPage({params}: {
  params: Promise<{productId: string}>
}) {
  const {productId} = await params;

  return (
    <main className={"mx-auto max-w-200"}>
      <Suspense fallback={<p>Loading...</p>}>
        <Configurator productId={productId} />
      </Suspense>
    </main>
  );
}