'use server';

import { prisma } from '@/lib/prisma';
import { Product } from "@prisma/client";

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export async function getProductById(id: string): Promise<Product | null> {
  return prisma.product.findFirst({
    where: {id: id}
  });
}

export async function getProductsByGroupId(groupId: string): Promise<Product[] | null> {
  return prisma.product.findMany({
    where: {
      groupId: groupId
    }
  });
}

export async function getDefaultProduct(groupId: string): Promise<Product | null> {
  const group = await prisma.productGroup.findUnique({
    where: { id: groupId },
    include: { defaultProduct: true },
  });

  return group?.defaultProduct || null;
}