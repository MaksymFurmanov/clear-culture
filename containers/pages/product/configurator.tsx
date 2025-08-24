import AddProductField from "./add-product-field";
import Variants from "./variants";
import ProductsProvider from "@/providers/products-provider";
import { getDefaultProduct, getProductsByGroupId } from "@/lib/actions/product";
import productsToClientProducts from "@/lib/client-converters/productsToClientProducts";

export default async function Configurator({ groupId }: {
  groupId: number,
}) {
  const allProducts = await getProductsByGroupId(groupId);
  if(!allProducts) throw new Error("Error in loading the page");
  const allProductsClient = productsToClientProducts(allProducts);

  const defaultProduct = await getDefaultProduct(groupId);
  if (!defaultProduct) throw new Error("Error in loading the page");
  const defaultProductClient = productsToClientProducts([defaultProduct])[0];

  return (
    <section className={"flex justify-around gap-3 mt-8 mb-4 mx-4"}>
      <ProductsProvider products={allProductsClient}
                        defaultProduct={defaultProductClient}>
        <Variants />
        <AddProductField />
      </ProductsProvider>
    </section>
  );
}