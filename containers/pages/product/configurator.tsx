import AddProductField from "./add-product-field";
import Variants from "./variants";
import ProductsProvider from "@/providers/products-provider";
import { getDefaultProduct, getProductsByGroupId } from "@/lib/actions/product";
import { serialize } from "@/lib/utils/superjson";
import { Product } from "@prisma/client";

export default async function Configurator({ groupId }: {
  groupId: string,
}) {
  const allProducts = serialize<Product[]>(await getProductsByGroupId(groupId));
  if(!allProducts) throw new Error("Error in loading the page");

  const defaultProduct = serialize<Product>(await getDefaultProduct(groupId));
  if (!defaultProduct) throw new Error("Error in loading the page");

  return (
    <section className={"flex justify-around gap-3 mt-8 mb-4 mx-4"}>
      <ProductsProvider productsJSON={allProducts}
                        defaultProductJSON={defaultProduct}>
        <Variants />
        <AddProductField />
      </ProductsProvider>
    </section>
  );
}