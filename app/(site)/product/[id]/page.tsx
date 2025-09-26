import { PageNotFoundError } from "next/dist/shared/lib/utils";
import Configurator from "@/containers/site-pages/product/configurator";
import DescriptionField from "@/containers/site-pages/product/description-field";
import { Suspense } from "react";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const groupId = params.id;
  if (!groupId) throw new PageNotFoundError("");

  return (
    <main className={"mx-auto max-w-200"}>
      <Suspense fallback={<p>Loading</p>}>
        <Configurator groupId={groupId} />
      </Suspense>

      <Suspense fallback={<p>Loading</p>}>
        <DescriptionField groupId={groupId} />
      </Suspense>
    </main>
  );
}