import orders from "@/data/placeholders/orders";
import OrderBox from "@/app/(site)/orders/order-box";


export default function OrdersList() {
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