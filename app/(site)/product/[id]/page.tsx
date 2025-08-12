import Configurator from "@/app/(site)/product/[id]/configurator";
import Details from "@/app/(site)/product/[id]/details";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const groupId = Number(params.id);
  if (!groupId) throw new PageNotFoundError("");

  return (
    <main className={"mx-auto max-w-200"}>
      <Configurator groupId={groupId} />
      <Details groupId={groupId}  />
    </main>
  );
}