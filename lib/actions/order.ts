"use server";

import { prisma } from "@/lib/prisma";
import { Order } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { getUserId } from "@/lib/actions/user";
import { revalidatePath } from "next/cache";
import { createOrderItems, deleteOrderItems } from "@/lib/actions/order-item";
import { clearCart, getCartItems, getCartTotalPrice } from "@/lib/actions/cart-items";

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

export async function createOrder(): Promise<void> {
  const userId = await getUserId();
  if (!userId) throw new Error("Authorization error");

  const cartItems = await getCartItems();
  if (cartItems.length < 1) throw new Error("The cart is empty");

  //check if there are enough items in the store stock to order

  const price = await getCartTotalPrice();
  const delivery = new Decimal("3.5");

  const order = await prisma.order.create({
    data: {
      price,
      delivery,
      userId
    }
  });

  await createOrderItems(cartItems, order.id);
  await clearCart();
}

export async function cancelOrder(orderId: string): Promise<void> {
  await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: "Canceled"
    }
  });

  revalidatePath(`order/${orderId}`);
  revalidatePath("orders");
}

export async function deleteOrder(orderId: string) {
  await deleteOrderItems(orderId);

  await prisma.order.delete({
    where: {
      id: orderId
    }
  });

  revalidatePath(`order/${orderId}`);
  revalidatePath("orders");
}