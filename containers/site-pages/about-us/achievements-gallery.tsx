"use client";

import Image from "next/image";
import useGallery from "@/hooks/use-gallery";
import Circle from "@/public/img/circle.svg";
import clsx from "clsx";
import { useEffect } from "react";
import achievements from "@/containers/site-pages/about-us/achievements";

export default function AchievementsGallery() {
  const { currImg, setImg } = useGallery(achievements.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setImg(currImg !== achievements.length - 1 ? currImg + 1 : 0);
    }, 4000);

    return () => clearInterval(interval);
  }, [setImg]);

  const changeImg = (i: number) => setImg(i);

  return (
    <section className={"mb-10 md:mb-12 mx-auto lg:w-3/5"}>
      <div className={"relative w-full md:w-3/5 lg:w-4/5 mx-auto aspect-[3/2] overflow-hidden md:rounded"}>
        <div
          className={"flex h-full transition-transform duration-500 ease-in-out"}
          style={{ transform: `translateX(-${currImg * 100}%)` }}
        >
          {achievements.map((achievement, index) => (
            <div key={index} className={"w-full flex-shrink-0 relative"}>
              <Image
                src={achievement.src}
                alt={""}
                fill
                className={"object-cover"}
              />
            </div>
          ))}
        </div>

        <div className={"absolute bottom-[4%] w-full flex justify-center gap-2 z-10"}>
          {achievements.map((_, index) => (
            <Circle
              key={index}
              onClick={() => changeImg(index)}
              className={clsx(
                index === currImg ? "text-gray-400" : "text-gray-300",
                "fill-current cursor-pointer w-3 h-3"
              )}
            />
          ))}
        </div>
      </div>

      <div className={"overflow-hidden w-full mt-6"}>
        <div
          className={"flex transition-transform duration-500 ease-in-out"}
          style={{ transform: `translateX(-${currImg * 100}%)` }}
        >
          {achievements.map((achievement, index) => (
            <div key={index} className={"w-full flex-shrink-0 px-4 md:px-0"}>
              <p className={"text-center md:w-3/5 mx-auto"}>
                {achievement.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}