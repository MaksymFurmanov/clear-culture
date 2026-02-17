"use server";

import { getUserId } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { getCartItems } from "@/lib/actions/cart-items";
import Decimal from "decimal.js";
import { Cart } from "@prisma/client";
import { serialize } from "@/lib/utils/superjson";

export async function getCartIdOrCreate(): Promise<string> {
  const userId = await getUserId();

  const cart = await prisma.cart.findFirst({
    where: { userId }
  });

  if (cart) {
    return cart.id;
  } else {
    const newCart = await prisma.cart.create({
      data: { userId, delivery: new Decimal(3.5) }
    });

    return newCart.id;
  }
}

export async function getCart(): Promise<Cart | null> {
  const userId = await getUserId();

  return prisma.cart.findFirst({
    where: { userId }
  });
}

export async function getCartForClient(): Promise<string> {
  return serialize<Cart | null>(await getCart());
}

export async function getCartOrThrow() {
  const userId = await getUserId();

  return prisma.cart.findUniqueOrThrow({
    where: { userId }
  });
}

export async function selectAddress(addressId: string): Promise<void> {
  const userId = await getUserId();

  await prisma.cart.update({
    where: { userId },
    data: { addressId }
  });
}

export async function updateCartPrice(): Promise<void> {
  const userId = await getUserId();
  const items = await getCartItems();

  const price = items.reduce(
    (sum, item) =>
      sum.add(item.product.price.mul(item.quantity)),
    new Decimal(0)
  );

  await prisma.cart.update({
    where: { userId },
    data: { price }
  });
}