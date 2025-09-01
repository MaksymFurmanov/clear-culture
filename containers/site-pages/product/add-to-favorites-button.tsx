import { useState } from "react";
import HeartRed from "@/public/img/heart-red.svg";
import Heart from "@/public/img/heart.svg";

export default function AddToFavoritesButton() {
  const [fav, setFav] = useState<boolean>(false);

  const addToFavorites = () => {
    setFav(!fav);
  };

  return (
    <button className={"cursor-pointer flex items-center gap-2"}
            onClick={addToFavorites}
    >
      {fav ? (
        <HeartRed />
      ) : (
        <Heart />
      )}
      <p>
        Add to favorites
      </p>
    </button>
  );
}