import reviews from "@/containers/pages/home/reviews-gallery/reviews";
import Image from "next/image";

export default function ReviewsImages({ currImg }: {
  currImg: number,
}) {
  return (
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
  );
}