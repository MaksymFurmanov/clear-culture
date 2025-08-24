import StatusBreadcrumbs from "@/containers/pages/order/status-breadcrumbs";
import Details from "@/containers/pages/order/details";
import ItemsList from "@/containers/pages/order/items-list";
import Receipt from "@/components/receipt";
import CancelButton from "@/containers/pages/order/cancel-button";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import BackButton from "@/containers/pages/order/back-button";
import { getOrderById } from "@/lib/actions/order";

export default async function Order({ params }: { params: Promise<{ id: string }> }) {
  const pageParams = await params;
  const orderId = pageParams.id;
  if (!orderId) throw new PageNotFoundError("");

  const order = await getOrderById(orderId);
  if(!order) throw new PageNotFoundError("Page not found");

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