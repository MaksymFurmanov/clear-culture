import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import Decimal from "decimal.js";
import { productGroups } from "@/src/prisma/data/productGroups";
import { loadMdx } from "@/src/lib/utils/load-mdx";
import { getProductsSeedData } from "@/src/prisma/data/products";
import { uploadImage } from "@/src/lib/utils/s3";

const prisma = new PrismaClient();
const ENABLE_IMAGE_UPLOAD = false;

async function main() {
  console.log("Starting seed...");

  await prisma.product.deleteMany();
  await prisma.productGroup.deleteMany();

  /*
    Product groups
  */
  for (const group of productGroups) {
    const descriptionMdx = loadMdx(group.slug);

    await prisma.productGroup.create({
      data: {
        name: group.name,
        slug: group.slug,
        descriptionMdx,
        pageUrl: group.pageUrl ?? null
      }
    });
  }

  const createdGroups = await prisma.productGroup.findMany({
    orderBy: { id: "asc" }
  });

  /*
    Products
  */
  const productsRaw = getProductsSeedData(createdGroups);

  await Promise.all(
    createdGroups.map(
      async (group) => {
        const filtered = productsRaw.filter(
          (product) => product.groupId === group.id
        );

        await Promise.all(
          filtered.map(async (productData) => {
            const createdProduct = await prisma.product.create({
              data: {
                name: productData.name,
                price: new Decimal(productData.price),
                groupId: group.id,
              }
            });

            if (ENABLE_IMAGE_UPLOAD) {
              const localImagePath = path.join(
                process.cwd(),
                "prisma/data/images",
                productData.photoSrc
              );

              const fileBuffer = await fs.readFile(localImagePath);

              const file = new File([fileBuffer], productData.photoSrc, {
                type: "image/webp"
              });

              const imageUrl = await uploadImage(
                file,
                `products/${group.slug}`
              );

              await prisma.product.update({
                where: { id: createdProduct.id },
                data: {
                  photoUrl: imageUrl
                }
              });
            }
          })
        );
      })
  );

  /*
    Default products
  */
  const createdProducts = await prisma.product.findMany({
    orderBy: { id: "asc" }
  });

  for (const group of createdGroups) {
    const firstProduct = createdProducts.find(
      (product) => product.groupId === group.id
    );

    if (firstProduct) {
      await prisma.productGroup.update({
        where: { id: group.id },
        data: { defaultProductId: firstProduct.id }
      });
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });