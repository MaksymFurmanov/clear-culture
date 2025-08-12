import Item from "@/app/(site)/order/[id]/item";
import { getOrderItems } from "@/lib/db-actions/orderItem";

export default async function ItemsList({ orderId }: {
  orderId: number
}) {
  const items = await getOrderItems(orderId);

  return (
    <div className={"mb-6"}>
      {items.map((item, index) => (
        <Item key={index}
              productId={item.productId}
              amount={item.amount} />
      ))}
    </div>
  );
}