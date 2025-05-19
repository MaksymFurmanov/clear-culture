import ListOfFavorites from "@/app/(site)/favorites/list-of-favorites";

export default function FavoritesPage() {
  return (
    <main className={"max-w-150 mx-auto"}>
      <h1 className={"text-3xl lg:text-4xl m-8 mt-10"}>
        Favorites
      </h1>
      <ListOfFavorites />
    </main>
  );
}