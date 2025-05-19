"use client";

import { useState } from "react";

export default function useGallery(length: number) {
  const [currImg, setCurrImg] = useState<number>(0);

  const prevImg = () => {
    setCurrImg((prevState) =>
      (prevState === 0 ? length - 1 : prevState - 1));
  };

  const nextImg = () => {
    setCurrImg((prevState) =>
      (prevState === length - 1 ? 0 : prevState + 1));
  };

  const setImg = (num: number) => {
    setCurrImg(num);
  };

  return { currImg, prevImg, nextImg, setImg };
}