'use server'

import { prisma } from '@/lib/prisma';
import { CartItem, OrderItem } from "@prisma/client";

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  return prisma.orderItem.findMany({
    where: {
      orderId: orderId
    }
  });
}

export async function createOrderItems(data: CartItem[], orderId: string): Promise<void> {
  await prisma.orderItem.createMany({
    data: data.map((item) => {
      return {
        quantity: item.quantity,
        orderId: orderId,
        productId: item.productId
      };
    })
  });
}

export async function deleteOrderItems(orderId: string): Promise<void> {
  await prisma.orderItem.deleteMany({
    where: {
      orderId: orderId
    }
  });
}