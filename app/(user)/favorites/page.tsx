import ListOfFavorites from "@/containers/user-pages/favorites/list-of-favorites";
import { Suspense } from "react";

export default function FavoritesPage() {
  return (
    <main className={"max-w-150 mx-auto"}>
      <h1 className={"text-3xl lg:text-4xl m-8 mt-10"}>
        Favorites
      </h1>
      <Suspense fallback={<p>Loading</p>}>
        <ListOfFavorites />
      </Suspense>
    </main>
  );
}