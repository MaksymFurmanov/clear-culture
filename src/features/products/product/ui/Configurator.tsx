import { Product } from "@prisma/client";
import { getProductByIdForClient, getProductsByGroupIdForClient } from "@/src/lib/actions/product";
import Variants from "@/src/features/products/product/ui/Variants";
import Info from "@/src/features/products/product/ui/Info";
import ProductsByGroupProvider from "@/src/app/providers/products-by-group-provider";
import { deserialize } from "@/src/lib/utils/superjson";

export default async function Configurator({ productId }: {
  productId: string,
}) {
  const superSelectedProduct = await getProductByIdForClient(productId);
  if (!superSelectedProduct) throw new Error("Error in loading the page");

  const superProducts = await getProductsByGroupIdForClient(
    deserialize<Product>(superSelectedProduct).groupId
  );
  if(!superProducts) throw new Error("Error in loading the page");

  return (
    <section className={"flex justify-around gap-3 mt-8 mb-4 mx-4"}>
      <ProductsByGroupProvider superProducts={superProducts}
                               superSelectedProduct={superSelectedProduct}>
        <Variants />
        <Info />
      </ProductsByGroupProvider>
    </section>
  );
}