import AddProductField from "./add-product-field";
import Variants from "./variants";
import ProductsByGroupProvider from "@/providers/products-by-group-provider";
import { superGetDefaultProduct, superGetProductsByGroupId } from "@/lib/actions/product";

export default async function Configurator({ groupId }: {
  groupId: string,
}) {
  const superProducts = await superGetProductsByGroupId(groupId);
  if(!superProducts) throw new Error("Error in loading the page");

  const superDefaultProduct = await superGetDefaultProduct(groupId);
  if (!superDefaultProduct) throw new Error("Error in loading the page");

  return (
    <section className={"flex justify-around gap-3 mt-8 mb-4 mx-4"}>
      <ProductsByGroupProvider superProducts={superProducts}
                               superDefaultProduct={superDefaultProduct}>
        <Variants />
        <AddProductField />
      </ProductsByGroupProvider>
    </section>
  );
}