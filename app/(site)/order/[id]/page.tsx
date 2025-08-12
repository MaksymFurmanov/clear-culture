import StatusBreadcrumbs from "@/app/(site)/order/[id]/status-breadcrumbs";
import Details from "@/app/(site)/order/[id]/details";
import ItemsList from "@/app/(site)/order/[id]/items-list";
import Receipt from "@/components/receipt";
import CancelButton from "@/app/(site)/order/[id]/cancel-button";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import BackButton from "@/app/(site)/order/back-button";
import { getOrderById } from "@/lib/db-actions/order";

export default async function Order({ params }: { params: Promise<{ id: string }> }) {
  const pageParams = await params;
  const orderId = Number(pageParams.id);
  if (!orderId) throw new PageNotFoundError("");

  const order = await getOrderById(orderId);
  if (!order) throw new PageNotFoundError("");

  return (
    <main className={"mx-auto max-w-170"}>
      <BackButton/>
      <StatusBreadcrumbs status={order.status}
                         processedDate={order.processedDate}
                         shippedDate={order.shippedDate}
                         arrivingDate={order.arrivingDate}
      />
      <Details orderId={order.id}
               createdDate={order.createdDate}
      />
      <ItemsList orderId={order.id} />
      <Receipt price={order.price}
               delivery={order.delivery}
      />
      <CancelButton />
    </main>
  );
}