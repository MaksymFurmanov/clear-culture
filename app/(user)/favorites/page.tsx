import { Product } from "@prisma/client";
import ListOfFavorites from "@/containers/user-pages/favorites/list-of-favorites";
import { getFavoriteProductsByUserId } from "@/lib/actions/favorite-product";
import { getUserSession } from "@/lib/session";

export default async function FavoritesPage() {
  const user = await getUserSession();
  if(!user) throw new Error("Internal server error");

  const products: Product[] = await getFavoriteProductsByUserId(user.id);

  return (
    <main className={"max-w-150 mx-auto"}>
      <h1 className={"text-3xl lg:text-4xl m-8 mt-10"}>
        Favorites
      </h1>
      <ListOfFavorites products={products}/>
    </main>
  );
}