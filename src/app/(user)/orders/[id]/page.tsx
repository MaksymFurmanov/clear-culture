import { Suspense } from "react";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { getOrderById } from "@/src/lib/actions/order";
import BackBtn from "@/src/features/user/orders/order/ui/BackBtn";
import StatusBreadcrumbs from "@/src/features/user/orders/order/ui/StatusBreadcrumbs";
import Details from "@/src/features/user/orders/order/ui/Details";
import ItemsList from "@/src/features/user/orders/order/ui/ItemsList";
import Receipt from "@/src/shared/Receipt";
import DeleteBtn from "@/src/features/user/orders/order/ui/DeleteBtn";
import CancelBtn from "@/src/features/user/orders/order/ui/CancelBtn";

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
      <BackBtn href={"/orders"}>
        All orders
      </BackBtn>
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
        <DeleteBtn orderId={orderId} />
      ) : (
        ["Arrived", "Delivered"].includes(order.status)
      ) || <CancelBtn orderId={orderId} />}
    </main>
  );
}