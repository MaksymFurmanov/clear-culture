import { PrismaClient } from "@prisma/client";
import { productGroups } from "@/prisma/data/productGroups";
import { getProductsSeedData } from "@/prisma/data/products";

const prisma = new PrismaClient();

async function main() {
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
  const createdProducts = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  // Set defaultProductId to the first product in each group
  for (const group of createdGroups) {
    const firstProduct = createdProducts.find(
      (product) => product.groupId === group.id
    );
    if (firstProduct) {
      await prisma.productGroup.update({
        where: { id: group.id },
        data: { defaultProductId: firstProduct.id },
      });
    }
  }
}

main()
  .then(() => console.log("Seeded"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
