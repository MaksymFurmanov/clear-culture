import ListOfFavorites from "@/containers/pages/favorites/list-of-favorites";
import { Product, User } from "@prisma/client";
import { getFavoriteProductsByUserId } from "@/lib/actions/favoriteProduct";
import { cookies } from "next/headers";

export default async function FavoritesPage() {
  const user = await cookies().then(value => {
    return value.get("session")?.value;
  }) as User;
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