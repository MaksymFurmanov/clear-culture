import Info from "./info";
import Variants from "./variants";
import ProductsByGroupProvider from "@/app/providers/products-by-group-provider";
import {
  superGetProductById,
  superGetProductsByGroupId
} from "@/lib/actions/product";
import { deserialize } from "@/lib/utils/superjson";
import { Product } from "@prisma/client";

export default async function Configurator({ productId }: {
  productId: string,
}) {
  const superSelectedProduct = await superGetProductById(productId);
  if (!superSelectedProduct) throw new Error("Error in loading the page");

  const superProducts = await superGetProductsByGroupId(
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