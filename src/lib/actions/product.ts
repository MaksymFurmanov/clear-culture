'use server';

import { Product } from "@prisma/client";
import { serialize } from "@/src/lib/utils/superjson";
import { prisma } from "@/src/lib/prisma";

export async function getProductById(id: string): Promise<Product | null> {
  return prisma.product.findFirst({
    where: {id: id}
  });
}

export async function getProductByIdForClient(id: string): Promise<string> {
  return serialize<Product | null>(await getProductById(id));
}

export async function getProductsByGroupId(groupId: string): Promise<Product[] | null> {
  return prisma.product.findMany({
    where: {
      groupId: groupId
    }
  });
}

export async function getProductsByGroupIdForClient(groupId: string): Promise<string> {
  return serialize<Product[] | null>(await getProductsByGroupId(groupId));
}