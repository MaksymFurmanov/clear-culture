"use server";

import { revalidatePath } from "next/cache";
import { CartItemWithProduct } from "@/src/features/cart/cart.types";
import { getCartIdOrCreate, getCartOrThrow, updateCartPrice } from "@/src/lib/actions/cart";
import { prisma } from "@/src/lib/prisma";
import { serialize } from "@/src/lib/utils/superjson";
import { getProductById } from "@/src/lib/actions/product";

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const cartId = await getCartIdOrCreate();

  return prisma.cartItem.findMany({
    where: { cartId },
    include: {
      product: true
    }
  });
}

export async function getCartItemsForClient(): Promise<string> {
  return serialize<CartItemWithProduct[]>(await getCartItems());
}

export async function createOrUpdateCartItem(
  productId: string,
  quantity: number,
): Promise<void> {
  const cartId = await getCartIdOrCreate();

  const product = await getProductById(productId);
  if (!product) throw new Error("Invalid product");

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId,
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
      cartId,
      productId,
      quantity
    }
  });

  await updateCartPrice();
  revalidatePath("/", "layout");
}

export async function createOrUpdateCartItems(
  items: CartItemWithProduct[],
  increment: boolean
): Promise<void> {
  const cartId = await getCartIdOrCreate();

  await Promise.all(
    items.map(async (item) => {
      const product =
        await getProductById(item.productId);
      if (!product) throw new Error(`Invalid product: ${item.productId}`);

      await prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId,
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
          cartId,
          productId: item.productId,
          quantity: item.quantity
        }
      });
    })
  );

  await updateCartPrice();
  revalidatePath("/", "layout");
}

export async function updateCartItem(
  productId: string,
  quantity: number,
) {
  const cartId = (await getCartOrThrow()).id;

  await prisma.cartItem.update({
    where: {
      cartId_productId: {cartId, productId}
    },
    include: {
      product: true
    },
    data: {
      quantity: quantity
    }
  });

  await updateCartPrice();
  revalidatePath("/cart");
}

export async function deleteCartItems(productId: string):
  Promise<void> {
  const cartId = (await getCartOrThrow()).id;

  await prisma.cartItem.delete({
    where: { cartId_productId: { cartId, productId } }
  });

  await updateCartPrice();
  revalidatePath("/", "layout");
}

export async function clearCart() {
  const cartId = (await getCartOrThrow()).id;

  await prisma.cartItem.deleteMany({
    where: { cartId }
  });

  await updateCartPrice();
  revalidatePath("/", "layout");
}