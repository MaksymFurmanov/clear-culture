"use server";

import { prisma } from "@/lib/prisma";
import { ProductGroup } from "@prisma/client";

export async function getProductGroupsCount(): Promise<number> {
  return prisma.productGroup.count();
}

export async function getProductGroups(
  fromIndex: number = 0,
  toIndex?: number
): Promise<ProductGroup[]> {
  if (!toIndex) {
    const totalCount = await getProductGroupsCount();
    toIndex = totalCount - 1;
  }

  return prisma.productGroup.findMany({
    skip: fromIndex,
    take: toIndex - fromIndex + 1,
    orderBy: { id: "asc" }
  });
}

export async function getProductGroupById(id: number): Promise<ProductGroup | null> {
  return prisma.productGroup.findUnique({
    where: {id: id}
  });
}