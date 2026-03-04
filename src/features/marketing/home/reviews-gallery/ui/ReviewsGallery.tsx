"use client";

import Arrow from "@/public/svg/arrow.svg";
import useGallery from "@/src/shared/hooks/use-gallery";
import ReviewsImages from "@/src/features/marketing/home/reviews-gallery/ui/ReviewsImages";
import ReviewsText from "@/src/features/marketing/home/reviews-gallery/ui/ReviewsText";
import reviews from "@/src/features/marketing/home/reviews-gallery/reviews";
import CatalogBtn from "@/src/features/marketing/home/reviews-gallery/ui/CatalogBtn";

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
      <CatalogBtn />
    </section>
  );
}

