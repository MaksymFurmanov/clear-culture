"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getFavoriteProductsByUserId(userId: string): Promise<Product[]> {
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

export async function isFavoriteProduct(userId: string, productId: string): Promise<boolean> {
  const favorite = await prisma.favoriteProduct.findFirst({
    where: { userId, productId },
  });

  return !!favorite;
}

export async function addFavoriteProductToUser(userId: string, productId: string): Promise<void> {
  const isFavorite = await isFavoriteProduct(userId, productId);
  if(isFavorite) return;

  await prisma.favoriteProduct.create({
    data: { userId, productId }
  });

  revalidatePath("/favorites");
}

export async function deleteFavoriteProductFromUser(userId: string, productId: string): Promise<void> {
  await prisma.favoriteProduct.deleteMany({
    where: {
      userId,
      productId
    }
  });

  revalidatePath("/favorites");
}