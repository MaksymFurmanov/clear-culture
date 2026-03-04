import { ReactNode, Suspense } from "react";
import DescriptionField from "@/src/features/products/product/ui/DescriptionField";
import { getProductGroupById } from "@/src/lib/actions/product-group";

export default async function GroupLayout({ children, params }: {
  children: ReactNode,
  params: Promise<{ groupId: string }>
}) {
  const { groupId } = await params;
  const productGroup = await getProductGroupById(groupId);
  if (!productGroup) throw new Error("Product group does not exist");

  console.log(productGroup);

  return (
    <div className="mx-auto max-w-200">
      <main>{children}</main>
      <Suspense fallback={<p>Loading description...</p>}>
        <DescriptionField productGroup={productGroup} />
      </Suspense>
    </div>
  );
}