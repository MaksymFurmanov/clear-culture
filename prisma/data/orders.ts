import { User } from "@prisma/client";

export function getOrdersSeedData(users: User[]) {
  return [
    {
      userId: users[0].id,
      createdDate: new Date("12.05.2025"),
      price: 200,
      delivery: 3.5,
      status: "Processing"
    },
    {
      userId: users[0].id,
      createdDate: new Date("14.05.2025"),
      processedDate: new Date("15.05.2025"),
      shippedDate: new Date("16.05.2025"),
      price: 100,
      delivery: 3.5,
      status: "Shipped"
    }
  ];
}