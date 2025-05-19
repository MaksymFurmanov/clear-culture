import favorites from "@/data/placeholders/favorites";
import productsVariants from "@/data/placeholders/productsVariants";
import { Fragment } from "react";
import FavoriteProduct from "@/app/(site)/favorites/favorite-product";

export default function ListOfFavorites() {
  const favoritesArray = favorites;

  return (
    <div className={"flex flex-col items-center"}>
      {favoritesArray.map((favorite, index) => {
          const productVariant = productsVariants.find((variant) =>
            variant.id === favorite.product_variant_id);

          if(!productVariant) {
            return <Fragment key={index} />
          }

          return (
            <FavoriteProduct key={index}
                             productVariant={productVariant}
            />
          );
        }
      )}
    </div>
  );
}