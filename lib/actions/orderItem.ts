'use server'

import { prisma } from '@/lib/prisma';
import { Prisma } from ".prisma/client";
import BatchPayload = Prisma.BatchPayload;
import { OrderItem } from "@prisma/client";

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  return prisma.orderItem.findMany({
    where: {
      orderId: orderId
    }
  });
}

export async function createOrderItems(orders: OrderItem[]): Promise<BatchPayload> {
  return prisma.orderItem.createMany({
    data: orders
  })
}