"use server";

import { prisma } from "@/lib/prisma";
import { CartItemWithProduct } from "@/types";
import { serialize } from "@/lib/utils/superjson";
import { getProductById } from "@/lib/actions/product";
import { getUserId } from "@/lib/actions/user";

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const userId = await getUserId();
  if(!userId) throw new Error("Authorization error");

  return prisma.cartItem.findMany({
    where: {
      userId
    },
    include: {
      product: true
    }
  });
}

export async function createOrUpdateCartItem(
  productId: string,
  quantity: number,
  increment?: boolean
): Promise<void> {
  const userId = await getUserId();
  if(!userId) throw new Error("Authorization error");

  const product = await getProductById(productId);
  if (!product) throw new Error("Invalid product");

  await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId,
        productId
      }
    },
    include: {
      product: true
    },
    update: {
      quantity: increment ? {increment: quantity} : quantity
    },
    create: {
      userId,
      productId,
      quantity
    }
  });
}

export async function createOrUpdateCartItems(
  items: CartItemWithProduct[]
): Promise<void> {
  const userId = await getUserId();
  if (!userId) throw new Error("Authorization error");

  await Promise.all(
    items.map(async (item) => {
      const product = await getProductById(item.productId);
      if (!product) throw new Error(`Invalid product: ${item.productId}`);

      await prisma.cartItem.upsert({
        where: {
          userId_productId: {
            userId,
            productId: item.productId
          }
        },
        include: {
          product: true
        },
        update: {
          quantity: item.quantity
        },
        create: {
          userId,
          productId: item.productId,
          quantity: item.quantity
        }
      });
    })
  );
}

export async function deleteCartItems(productId: string):
  Promise<void> {
  const userId = await getUserId();
  if(!userId) throw new Error("Authorization error");

  await prisma.cartItem.delete({
    where: { userId_productId: { userId, productId } }
  });
}

export async function superGetCartItems(): Promise<string> {
  return serialize<CartItemWithProduct[]>(await getCartItems());
}