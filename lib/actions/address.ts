"use server";

import { prisma } from "@/lib/prisma";
import { AddressInput } from "@/lib/validators/address";
import { Address } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/actions/user";
import { getCartOrThrow } from "@/lib/actions/cart";

function revalidateAddresses() {
  revalidatePath("/address-book");
  revalidatePath("/choose-address");
}

export async function getAddressById(id: string): Promise<Address | null> {
  return prisma.address.findFirst({
    where: {id}
  });
}

export async function getSelectedAddress(): Promise<Address | null> {
  const cart = await getCartOrThrow();
  if(!cart.addressId) throw new Error("Delivery address is not specified");

  return prisma.address.findFirst({
    where: { id: cart.addressId }
  });
}

export async function getAddresses(): Promise<Address[]> {
  const userId = await getUserId();

  return prisma.address.findMany({
    where: { userId }
  });
}

export async function createAddress(data: AddressInput): Promise<Address> {
  const userId = await getUserId();

  const address = await prisma.address.create({
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

  revalidateAddresses();

  return address;
}

export async function updateAddress(id: string, data: AddressInput): Promise<void>  {
  await prisma.address.update({
    where: {id},
    data: {
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

  revalidateAddresses();
}

export async function deleteAddress(id: string): Promise<void> {
  await prisma.address.delete({
    where: {id}
  });

  revalidateAddresses();
}