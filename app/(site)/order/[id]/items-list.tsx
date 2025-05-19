import orderItems from "@/data/placeholders/orderItems";
import Item from "@/app/(site)/order/[id]/item";

export default function ItemsList({ id }: {
  id: string
}) {
  const items = orderItems.filter((item) =>
    item.order_id === id
  );

  return (
    <div className={"mb-6"}>
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}