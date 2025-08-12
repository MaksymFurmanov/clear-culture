'use server'

import { prisma } from '@/lib/prisma';
import { FavoriteProduct } from "@/types/database";

export async function getFavoriteProducts(): Promise<FavoriteProduct[]> {
  return prisma.favoriteProduct.findMany();
}