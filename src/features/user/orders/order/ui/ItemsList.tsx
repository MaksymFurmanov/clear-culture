import { getOrderItems } from "@/src/lib/actions/order-item";
import Item from "@/src/features/user/orders/order/ui/Item";

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