import { Suspense } from "react";
import Configurator from "@/src/features/products/product/ui/Configurator";

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