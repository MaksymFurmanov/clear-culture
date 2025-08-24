'use server'

import { prisma } from '@/lib/prisma';
import { FavoriteProduct } from "@prisma/client";

export async function getFavoriteProducts(): Promise<FavoriteProduct[]> {
  return prisma.favoriteProduct.findMany();
}