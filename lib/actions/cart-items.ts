"use server";

import { prisma } from "@/lib/prisma";
import { CartItemWithProduct } from "@/types";
import { serialize } from "@/lib/utils/superjson";
import { getProductById } from "@/lib/actions/product";
import { getUserId } from "@/lib/actions/user";
import Decimal from "decimal.js";
import { revalidatePath } from "next/cache";

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const userId = await getUserId();

  return prisma.cartItem.findMany({
    where: {
      userId
    },
    include: {
      product: true
    }
  });
}

export async function superGetCartItems(): Promise<string> {
  return serialize<CartItemWithProduct[]>(await getCartItems());
}

export async function getCartTotalPrice():
  Promise<string> {
  const items = await getCartItems();

  return items.reduce(
    (sum, item) =>
      sum.add(item.product.price.mul(item.quantity)),
    new Decimal(0)
  ).toString();
}

export async function createOrUpdateCartItem(
  productId: string,
  quantity: number,
): Promise<void> {
  const userId = await getUserId();

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
      quantity: { increment: quantity }
    },
    create: {
      userId,
      productId,
      quantity
    }
  });

  revalidatePath("/", "layout");
}

export async function createOrUpdateCartItems(
  items: CartItemWithProduct[],
  increment: boolean
): Promise<void> {
  const userId = await getUserId();

  await Promise.all(
    items.map(async (item) => {
      const product =
        await getProductById(item.productId);
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
          quantity: increment ? { increment: item.quantity } : item.quantity
        },
        create: {
          userId,
          productId: item.productId,
          quantity: item.quantity
        }
      });
    })
  );

  revalidatePath("/", "layout");
}

export async function updateCartItem(
  productId: string,
  quantity: number,
) {
  const userId = await getUserId();

  await prisma.cartItem.update({
    where: {
      userId_productId: {userId, productId}
    },
    include: {
      product: true
    },
    data: {
      quantity: quantity
    }
  });

  revalidatePath("/cart");
}

export async function deleteCartItems(productId: string):
  Promise<void> {
  const userId = await getUserId();

  await prisma.cartItem.delete({
    where: { userId_productId: { userId, productId } }
  });

  revalidatePath("/", "layout");
}

export async function clearCart() {
  const userId = await getUserId();

  await prisma.cartItem.deleteMany({
    where: {
      userId: userId
    }
  });

  revalidatePath("/", "layout");
}