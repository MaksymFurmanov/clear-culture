import Item from "@/containers/pages/order/item";
import { getOrderItems } from "@/lib/actions/orderItem";

export default async function ItemsList({ orderId }: {
  orderId: string
}) {
  const items = await getOrderItems(orderId);

  return (
    <div className={"mb-6"}>
      {items.map((item, index) => (
        <Item key={index}
              productId={item.productId}
              amount={item.quantity} />
      ))}
    </div>
  );
}