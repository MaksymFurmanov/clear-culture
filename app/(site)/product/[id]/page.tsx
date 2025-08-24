import Configurator from "@/containers/pages/product/configurator";
import Details from "@/containers/pages/product/details";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const groupId = params.id;
  if (!groupId) throw new PageNotFoundError("");

  return (
    <main className={"mx-auto max-w-200"}>
      <Configurator groupId={groupId} />
      <Details groupId={groupId}  />
    </main>
  );
}