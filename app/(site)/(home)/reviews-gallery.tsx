'use client';

import Image from "next/image";
import Arrow from "@/public/img/arrow.svg";
import useGallery from "@/hooks/useGallery";
import reviews from "@/data/reviews";

export default function ReviewsGallery() {
  const {
    currImg,
    prevImg,
    nextImg
  } = useGallery(reviews.length);

  return (
    <section className={"flex flex-col items-center mb-10 mx-auto lg:max-w-180"}>
      <div className={"flex justify-between items-center overflow-hidden w-4/5 mb-3"}>
        <Arrow className={"w-4 scale-x-[-1] cursor-pointer"}
               onClick={prevImg}
        />

        <div className="relative w-full mx-auto h-fit">
          <div className="overflow-hidden h-full">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currImg * 100}%)` }}
            >
              {reviews.map((review, index) => {
                  return (
                    <div key={index}
                         className={"flex flex-col flex-shrink-0 w-full items-center"}
                    >
                      <Image className={"w-4/5 border-2 border-black rounded-md mb-8"}
                             src={review.imgSrc}
                             alt={""}
                             width={200}
                             height={200}
                      />

                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        <Arrow className={"w-4 cursor-pointer"}
               onClick={nextImg}
        />
      </div>

      <div className="relative w-full mx-auto h-fit">
        <div className="overflow-hidden h-full">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currImg * 100}%)` }}
          >
            {reviews.map((review, index) => {
              return (
                <div key={index}
                     className={"flex flex-col flex-shrink-0 w-full items-center"}
                >
                  <p className={"text-center w-4/5 mb-6 md:text-lg"}>
                    {review.text}
                  </p>
                  <p className={"text-center text-base md:text-xl"}>
                    {review.author}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}