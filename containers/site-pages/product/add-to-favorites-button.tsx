"use client";

import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import Heart from "@/public/img/heart.svg";
import {
  addFavoriteProductToUser,
  deleteFavoriteProduct,
  isFavoriteProduct
} from "@/lib/actions/favorite-product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useProductGroup } from "@/providers/products-by-group-provider";

export default function AddToFavoritesButton() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { curr } = useProductGroup();
  const router = useRouter();

  const [fav, setFav] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!userId) return;
    isFavoriteProduct(curr.id)
      .then(setFav)
      .catch((e) => {
        console.error(e);
      });
  }, [userId, curr.id]);

  const addToFavorites = () => {
    if (!userId) {
      router.push("/log-in");
      return;
    }

    startTransition(async () => {
      const nextFav = !fav;

      try {
        if (nextFav) {
          await addFavoriteProductToUser(curr.id);
          setFav(nextFav);
        } else {
          await deleteFavoriteProduct(curr.id);
          setFav(nextFav);
        }
      } catch (e) {
        console.error("Failed to update favorites", e);
        setFav(!nextFav);
      }
    });
  };

  return (
    <button className={"cursor-pointer flex items-center gap-2 disabled:opacity-50"}
            disabled={isPending}
            onClick={addToFavorites}
    >
      <motion.div
        animate={{
          scale: fav ? [1, 1.3, 1] : [1, 0.8, 1],
          fill: fav ? "#ef4444" : "#6b7280",
        }}
        transition={{ duration: 0.5 }}
      >
        <Heart className="w-4 h-4" />
      </motion.div>
      <p>
        Add to favorites
      </p>
    </button>
  );
}