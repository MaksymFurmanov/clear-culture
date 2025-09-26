import StatusBreadcrumbs from "@/containers/user-pages/order/status-breadcrumbs";
import Details from "@/containers/user-pages/order/details";
import ItemsList from "@/containers/user-pages/order/items-list";
import Receipt from "@/components/receipt";
import CancelButton from "@/containers/user-pages/order/cancel-button";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import BackButton from "@/containers/user-pages/order/back-button";
import { getOrderById } from "@/lib/actions/order";
import {Suspense} from "react";

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
      <Suspense fallback={<p>Loading</p>}>
        <ItemsList orderId={order.id} />
      </Suspense>
      <Receipt price={order.price.toString()}
               delivery={order.delivery.toString()}
               total={order.price.add(order.delivery).toString()}
      />
      <CancelButton />
    </main>
  );
}