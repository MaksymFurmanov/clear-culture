"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserSession } from "@/lib/session";

export async function getFavoriteProducts(): Promise<Product[]> {
  const user = await getUserSession();
  if (!user) throw new Error("Authorization error");
  const userId = user.id;

  const favorites = await prisma.favoriteProduct.findMany({
    where: {
      userId
    },
    include: {
      Product: true
    }
  });

  return favorites.map(favorite => favorite.Product);
}

export async function getFavoriteProductId(productId: string): Promise<string | undefined> {
  const user = await getUserSession();
  if (!user) throw new Error("Authorization error");
  const userId = user.id;

  const favorite = await prisma.favoriteProduct.findUnique({
    where: {
      userId_productId: { userId, productId }
    },
  });

  return favorite?.id;
}

export async function isFavoriteProduct(productId: string): Promise<boolean> {
  return !!await getFavoriteProductId(productId);
}

export async function addFavoriteProductToUser(productId: string): Promise<void> {
  const user = await getUserSession();
  if (!user) throw new Error("Authorization error");
  const userId = user.id;

  const isFavorite = await isFavoriteProduct(productId);
  if(isFavorite) return;

  await prisma.favoriteProduct.create({
    data: { userId, productId }
  });

  revalidatePath("/favorites");
}

export async function deleteFavoriteProduct(productId: string): Promise<void> {
  const favoriteId = await getFavoriteProductId(productId);

  if (!favoriteId) {
    throw new Error("Favorite not found");
  }

  await prisma.favoriteProduct.delete({
    where: {
      id: favoriteId,
    },
  });

  revalidatePath("/favorites");
}