import { User } from "@prisma/client";

export function getOrders(users: User[]) {
  return [
    {
      userId: users[0].id,
      createdDate: "12.05.2025",
      price: 200,
      delivery: 3.5,
      status: "Processing"
    },
    {
      userId: users[0].id,
      createdDate: "14.05.2025",
      processedDate: "15.05.2025",
      shippedDate: "16.05.2025",
      price: 100,
      delivery: 3.5,
      status: "Shipped"
    }
  ];
}