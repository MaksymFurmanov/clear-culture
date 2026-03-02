"use server";

import { prisma } from "@/lib/prisma";
import { Order } from "@prisma/client";
import { getUserId } from "@/lib/actions/user";
import { revalidatePath } from "next/cache";
import { createOrderItems, deleteOrderItems } from "@/lib/actions/order-item";
import { clearCart, getCartItems } from "@/lib/actions/cart-items";
import { getCartOrThrow } from "@/lib/actions/cart";

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
  const cart = await getCartOrThrow();
  if(!cart.addressId) throw new Error("Delivery address is not defined");

  const cartItems = await getCartItems();
  if (cartItems.length < 1) throw new Error("The cart is empty");

  //check if there are enough items in the store stock to order

  const order = await prisma.order.create({
    data: {
      price: cart.price,
      delivery: cart.delivery,
      userId,
      addressId: cart.addressId
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