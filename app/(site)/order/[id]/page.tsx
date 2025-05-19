import StatusBreadcrumbs from "@/app/(site)/order/[id]/status-breadcrumbs";
import Details from "@/app/(site)/order/[id]/details";
import ItemsList from "@/app/(site)/order/[id]/items-list";
import Receipt from "@/components/receipt";
import CancelButton from "@/app/(site)/order/[id]/cancel-button";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import orders from "@/data/placeholders/orders";

export default async function Order({ params }: { params: Promise<{ id: string }> }) {
  const pageParams = await params;
  const orderId = pageParams.id;
  if (!orderId) throw new PageNotFoundError("");

  const order = orders.find(order => order.id === orderId);
  if (!order) throw new PageNotFoundError("");

  return (
    <main className={"mx-auto max-w-170"}>
      <StatusBreadcrumbs order={order} />
      <Details order={order} />
      <ItemsList id={order.id} />
      <Receipt price={order.price}
               delivery={order.delivery}
      />
      <CancelButton />
    </main>
  );
}