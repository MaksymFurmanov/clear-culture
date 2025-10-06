"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Heart from "@/public/img/heart.svg";
import {
  addFavoriteProductToUser,
  deleteFavoriteProduct,
  isFavoriteProduct
} from "@/lib/actions/favorite-product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useProductGroup } from "@/app/providers/products-by-group-provider";

export default function AddToFavoritesButton() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { curr } = useProductGroup();
  const { push } = useRouter();
  const controls = useAnimation();

  const [fav, setFav] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    (async () => {
      try {
        setFav(await isFavoriteProduct(curr.id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, curr.id]);

  const addToFavorites = () => {
    if (!userId) {
      push("/log-in");
      return;
    }

    const nextFav = !fav;
    setFav(nextFav);

    if (nextFav) {
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.4 }
      });
    }

    (async () => {
      try {
        if (nextFav) {
          await addFavoriteProductToUser(curr.id);
        } else {
          await deleteFavoriteProduct(curr.id);
        }
      } catch (e) {
        console.error("Failed to update favorites", e);
        setFav(!nextFav);
      }
    })();
  };

  return (
    loading
      ? <p>Loading</p>
      : <button className={"cursor-pointer flex items-center gap-2 disabled:opacity-50"}
                onClick={addToFavorites}
      >
        <motion.div
          animate={controls}
          style={{ fill: fav ? "#ef4444" : "#6b7280" }}
        >
          <Heart className="w-4 h-4" />
        </motion.div>
        <p>
          Add to favorites
        </p>
      </button>
  );
}