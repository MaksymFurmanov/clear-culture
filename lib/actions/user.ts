'use server'

import { prisma } from '@/lib/prisma';
import { User } from "@prisma/client";

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function getUserByLoginData(email: string, password: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      email: email,
      password: password
    }
  });
}