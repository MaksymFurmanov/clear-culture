import { Order, Product } from "@prisma/client";

export function getOrderItemsSeedData(
  orders: Order[],
  products: Product[]
) {
  return [
    {
      orderId: orders[0].id,
      productId: products[3].id,
      amount: 1
    },
    {
      orderId: orders[0].id,
      productId: products[1].id,
      amount: 2
    },
    {
      orderId: orders[1].id,
      productId: products[1].id,
      amount: 3
    },
    {
      orderId: orders[1].id,
      productId: products[2].id,
      amount: 1
    },
    {
      orderId: orders[1].id,
      productId: products[3].id,
      amount: 1
    }
  ];
}

export default getOrderItemsSeedData;