import { Order, Product } from "@prisma/client";

export function getOrderItemsSeedData(
  orders: Order[],
  products: Product[]
) {
  return [
    {
      orderId: orders[0].id,
      productId: products[3].id,
      quantity: 1
    },
    {
      orderId: orders[0].id,
      productId: products[1].id,
      quantity: 2
    },
    {
      orderId: orders[1].id,
      productId: products[1].id,
      quantity: 3
    },
    {
      orderId: orders[1].id,
      productId: products[2].id,
      quantity: 1
    },
    {
      orderId: orders[1].id,
      productId: products[3].id,
      quantity: 1
    }
  ];
}

export default getOrderItemsSeedData;