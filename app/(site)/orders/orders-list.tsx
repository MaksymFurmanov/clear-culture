import OrderBox from "@/app/(site)/orders/order-box";
import { getOrders } from "@/lib/db-actions/order";

export default async function OrdersList() {
  const orders = await getOrders();

  return (
    <div className={"flex flex-wrap gap-x-12 gap-y-8 justify-center items-center px-4 mb-10"}>
      <OrdersFilter />
      {orders.map((order, index) => (
        <OrderBox key={index} order={order} />
      ))}
    </div>
  );
}

function OrdersFilter() {
  return (
    <></>
  );
}