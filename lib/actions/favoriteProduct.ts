"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export async function getFavoriteProductsByUserId(userId: string): Promise<Product[]> {
  const favorites = await prisma.favoriteProduct.findMany({
    where: {
      userId,
    },
    include: {
      Product: true,
    },
  });

  return favorites.map(favorite => favorite.Product);
}