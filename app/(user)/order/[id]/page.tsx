import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { getOrderById } from "@/lib/actions/order";
import BackButton from "@/components/buttons/back-button";
import StatusBreadcrumbs from "@/containers/user-pages/order/status-breadcrumbs";
import Details from "@/containers/user-pages/order/details";
import { Suspense } from "react";
import ItemsList from "@/containers/user-pages/order/items-list";
import Receipt from "@/components/receipt";
import CancelButton from "@/containers/user-pages/order/cancel-button";
import DeleteButton from "@/containers/user-pages/order/delete-button";

export default async function Order({ params }: {
  params: Promise<{ id: string }>
}) {
  const pageParams = await params;
  const orderId = pageParams.id;
  if (!orderId) throw new PageNotFoundError("");

  const order = await getOrderById(orderId);
  if (!order) throw new PageNotFoundError("Page not found");

  return (
    <main className={"mx-4 md:mx-auto max-w-170"}>
      <BackButton href={"/orders"}>
        All orders
      </BackButton>
      {order.status !== "Canceled" ? (
        <StatusBreadcrumbs status={order.status}
                           processedDate={order.processedDate}
                           shippedDate={order.shippedDate}
                           arrivingDate={order.arrivingDate}
        />
      ) : (
        <h2 className={"text-3xl text-red-700 my-8"}>
          Canceled
        </h2>
      )}
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
      {order.status === "Canceled" ? (
        <DeleteButton orderId={orderId} />
      ) : (
        ["Arrived", "Delivered"].includes(order.status)
      ) || <CancelButton orderId={orderId} />}
    </main>
  );
}