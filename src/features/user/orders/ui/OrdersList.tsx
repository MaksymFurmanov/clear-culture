import { getOrders } from "@/src/lib/actions/order";
import ListPlaceholder from "@/src/shared/ListPlaceholder";
import OrderBox from "@/src/features/user/orders/ui/OrderBox";

export default async function OrdersList() {
  const orders = await getOrders();

  return (
    <div className={"flex flex-wrap gap-x-12 gap-y-8 justify-center items-center px-4 mb-10"}>
      <OrdersFilter />
      {orders.length < 1 ? (
        <ListPlaceholder message={"You don't have any saved orders"}
                         buttonName={"Shop now"}
                         href={"/catalog/1"}
        />
      ) : orders.map((order, index) => (
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