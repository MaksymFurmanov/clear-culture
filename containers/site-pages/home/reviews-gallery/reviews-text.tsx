import reviews from "@/containers/site-pages/home/reviews-gallery/reviews";

export default function ReviewsText({ currImg }: {
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
  );
}