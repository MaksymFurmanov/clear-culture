"use server";

import { prisma } from "@/lib/prisma";
import { Order } from "@prisma/client";

export async function getOrdersCount() {
  return prisma.order.count();
}

export async function getOrders(
  fromIndex: number = 0,
  toIndex?: number
): Promise<Order[]> {
  if (!toIndex) {
    const totalCount = await getOrdersCount();
    toIndex = totalCount - 1;
  }

  return prisma.order.findMany({
    skip: fromIndex,
    take: toIndex - fromIndex + 1,
    orderBy: { id: "asc" }
  });
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  return prisma.order.findFirst({
    where: {
      id: orderId
    }
  });
}

export async function createOrder(order: Order): Promise<Order> {
  return prisma.order.create({data: order});
}