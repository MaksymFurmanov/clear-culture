import DescriptionField from "@/containers/site-pages/product/description-field";
import { getProductGroupById } from "@/lib/actions/product-group";
import { getDescriptionMDX } from "@/lib/actions/storage";
import { ReactNode, Suspense } from "react";

export default async function GroupLayout({ children, params }: {
  children: ReactNode,
  params: Promise<{ groupId: string }>
}) {
  const { groupId } = await params;
  const productGroup = await getProductGroupById(groupId);
  if (!productGroup) throw new Error("Product group does not exist");

  const descriptionMDX = productGroup.descriptionUrl
    ? await getDescriptionMDX(productGroup.descriptionUrl)
    : undefined;

  return (
    <div className="mx-auto max-w-200">
      <main>{children}</main>
      <Suspense fallback={<p>Loading description...</p>}>
        <DescriptionField productGroup={productGroup}
                          descriptionMDX={descriptionMDX} />
      </Suspense>
    </div>
  );
}