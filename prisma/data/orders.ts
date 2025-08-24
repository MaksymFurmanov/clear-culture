import { User } from "@prisma/client";

export function getOrdersSeedData(users: User[]) {
  return [
    {
      userId: users[0].id,
      createdDate: new Date("2025-05-12"),
      price: 200,
      delivery: 3.5,
      status: "Processing"
    },
    {
      userId: users[0].id,
      createdDate: new Date("2025-05-14"),
      processedDate: new Date("2025-05-15"),
      shippedDate: new Date("2025-05-16"),
      price: 100,
      delivery: 3.5,
      status: "Shipped"
    }
  ];
}