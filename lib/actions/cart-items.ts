"use server";

import { prisma } from "@/lib/prisma";
import { CartItemWithProduct } from "@/types";
import { serialize } from "@/lib/utils/superjson";
import { getUserSession } from "@/lib/session";
import { getProductById } from "@/lib/actions/product";
import { revalidatePath } from "next/cache";

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const user = await getUserSession();
  if (!user) throw new Error("Authorization error");
  const userId = user.id;

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
  quantity: number
): Promise<CartItemWithProduct[]> {
  const user = await getUserSession();
  if (!user) throw new Error("Authorization error");
  const userId = user.id;

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
      quantity: quantity
    },
    create: {
      userId,
      productId,
      quantity
    }
  });

  revalidatePath("/cart");
  return await getCartItems();
}

export async function createOrUpdateCartItems(
  items: CartItemWithProduct[]
): Promise<CartItemWithProduct[]> {
  const updatedItems = await Promise.all(
    items.map(item => createOrUpdateCartItem(item.productId, item.quantity))
  );

  return updatedItems.flat();
}

export async function deleteCartItems(productId: string):
  Promise<CartItemWithProduct[]> {
  const user = await getUserSession();
  if (!user) throw new Error("Authorization error");
  const userId = user.id;

  await prisma.cartItem.delete({
    where: { userId_productId: { userId, productId } }
  });

  return await getCartItems();
}

export async function superGetCartItems(): Promise<string> {
  return serialize<CartItemWithProduct[]>(await getCartItems());
}

export async function superCreateOrUpdateCartItem(
  productId: string,
  quantity: number
): Promise<string> {
  return serialize<CartItemWithProduct[]>(
    await createOrUpdateCartItem(productId, quantity)
  );
}

export async function superCreateOrUpdateCartItems(
  items: CartItemWithProduct[]
): Promise<string> {
  const updatedItems = await createOrUpdateCartItems(items);
  return serialize<CartItemWithProduct[]>(updatedItems);
}