"use server";

import { prisma } from "@/lib/prisma";
import { AddressInput } from "@/lib/validators/address";

export async function createAddress(data: AddressInput) {
  return prisma.address.create({
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
}