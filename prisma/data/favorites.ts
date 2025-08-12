import { Product, User } from "@prisma/client";

export function getFavorites(
  users: User[],
  products: Product[]
) {
  return [
    {
      userId: users[0].id,
      productId: products[0].id
    },
    {
      userId: users[0].id,
      productId: products[1].id
    },
    {
      userId: users[0].id,
      productId: products[2].id
    }
  ];
}