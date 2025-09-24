'use server';

import { prisma } from '@/lib/prisma';
import { Product } from "@prisma/client";
import { serialize } from "@/lib/utils/superjson";

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

export async function superGetProductById(id: string): Promise<string> {
  return serialize<Product | null>(await getProductById(id));
}

export async function superGetProductsByGroupId(groupId: string): Promise<string> {
  return serialize<Product[] | null>(await getProductsByGroupId(groupId));
}

export async function superGetDefaultProduct(groupId: string): Promise<string> {
  return serialize<Product | null>(await getDefaultProduct(groupId));
}