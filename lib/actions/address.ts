"use server";

import { prisma } from "@/lib/prisma";
import { AddressInput } from "@/lib/validators/address";
import { Address } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/actions/user";

export async function isSavedAddresses() {
  const userId = await getUserId();

  return prisma.address.findFirst({where: {userId}})
}

export async function getAddresses(): Promise<Address[]> {
  const userId = await getUserId();

  return prisma.address.findMany({
    where: { userId },
  });
}

export async function createAddress(data: AddressInput): Promise<void> {
  const userId = await getUserId();

  prisma.address.create({
    data: {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      country: data.country,
      city: data.city,
      streetAddress: data.streetAddress,
      zipCode: data.zipCode
    }
  });

  revalidatePath("/address-book");
  revalidatePath("/choose-address");
}