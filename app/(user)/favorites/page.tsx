import { Product } from "@prisma/client";
import ListOfFavorites from "@/containers/user-pages/favorites/list-of-favorites";
import { getFavoriteProducts } from "@/lib/actions/favorite-product";

export default async function FavoritesPage() {
  const products: Product[] = await getFavoriteProducts();

  return (
    <main className={"max-w-150 mx-auto"}>
      <h1 className={"text-3xl lg:text-4xl m-8 mt-10"}>
        Favorites
      </h1>
      <ListOfFavorites products={products}/>
    </main>
  );
}