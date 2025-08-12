'use server'

import { prisma } from '@/lib/prisma';
import { OrderItem } from "@/types/database";

export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  return prisma.orderItem.findMany({
    where: {
      orderId: orderId
    }
  });
}