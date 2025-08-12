import { getProducts } from "@/lib/db-actions/product";
import { Fragment } from "react";
import CardItem from "@/app/(site)/favorites/card-item";
import { Product } from "@/types/database";
import { getFavoriteProducts } from "@/lib/db-actions/favoriteProduct";
import { FavoriteProduct } from "@prisma/client";

export default async function ListOfFavorites() {
  const favorites: FavoriteProduct[] = await getFavoriteProducts();
  const products: Product[] = await getProducts();

  return (
    <div>
      {favorites.map((favorite: FavoriteProduct, index) => {
          const product = products.find(
            (product: Product) => product.id === favorite.productId
          );

          if (!product) {
            return <Fragment key={index} />;
          }

          return (
            <CardItem key={index}
                      photoUrl={product.photoUrl}
                      name={product.name}
                      productId={product.id}
            />
          );
        }
      )}
    </div>
  );
}