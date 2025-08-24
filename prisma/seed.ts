import { PrismaClient } from "@prisma/client";
import { productGroups } from "@/prisma/data/productGroups";
import { getProductsSeedData } from "@/prisma/data/products";
import users from "@/prisma/data/users";
import { getFavoriteProductsSeedData } from "@/prisma/data/favorites";
import getOrderItemsSeedData from "@/prisma/data/orderItems";
import { getOrdersSeedData } from "@/prisma/data/orders";

const prisma = new PrismaClient();

async function main() {
  //Seeding users
  await prisma.user.createMany({
    data: users
  });
  const createdUsers = await prisma.user.findMany();

  //Seeding product groups
  await prisma.productGroup.createMany({
    data: productGroups
  });
  const createdGroups = await prisma.productGroup.findMany();

  //Seeding products
  const productsRaw = getProductsSeedData(createdGroups);
  await prisma.product.createMany({
    data: productsRaw
  });
  const createdProducts = await prisma.product.findMany();

  //Seeding favorite products
  const favoriteProductsRaw = getFavoriteProductsSeedData(createdUsers, createdProducts);
  await prisma.favoriteProduct.createMany({
    data: favoriteProductsRaw
  });

  //Seeding orders
  const ordersRaw = getOrdersSeedData(createdUsers);
  await prisma.order.createMany({
    data: ordersRaw
  });
  const createdOrders = await prisma.order.findMany();

  //Seeding order items
  const orderItemsRaw = getOrderItemsSeedData(createdOrders, createdProducts);
  await prisma.orderItem.createMany({
    data: orderItemsRaw
  });
}

main()
  .then(() => console.log("Seeded"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
