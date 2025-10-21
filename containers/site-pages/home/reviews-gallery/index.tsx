"use client";

import Arrow from "@/public/img/arrow.svg";
import useGallery from "@/hooks/use-gallery";
import reviews from "@/containers/site-pages/home/reviews-gallery/reviews";
import ReviewsText from "@/containers/site-pages/home/reviews-gallery/reviews-text";
import ReviewsImages from "@/containers/site-pages/home/reviews-gallery/reviews-images";
import CatalogButton from "@/containers/site-pages/home/reviews-gallery/catalog-button";

export default function ReviewsGallery() {
  const {
    currImg,
    prevImg,
    nextImg
  } = useGallery(reviews.length);

  return (
    <section>
      <div className={"flex flex-col items-center mb-10 mx-auto lg:max-w-180"}>
        <div className={"flex justify-between items-center overflow-hidden w-4/5 mb-3"}>
          <Arrow className={"w-4 scale-x-[-1] cursor-pointer"}
                 onClick={prevImg}
          />

          <ReviewsImages currImg={currImg} />

          <Arrow className={"w-4 cursor-pointer"}
                 onClick={nextImg}
          />
        </div>

        <ReviewsText currImg={currImg} />
      </div>
      <CatalogButton />
    </section>
  );
}

