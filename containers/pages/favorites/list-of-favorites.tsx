import { getProducts } from "@/lib/actions/product";
import { Fragment } from "react";
import CardItem from "@/containers/pages/favorites/card-item";
import { getFavoriteProducts } from "@/lib/actions/favoriteProduct";
import { FavoriteProduct, Product } from "@prisma/client";

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