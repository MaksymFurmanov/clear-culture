import certificatesList from "@/containers/pages/home/certificates-gallery/certificates";
import Circle from "@/public/img/circle.svg";
import clsx from "clsx";

export default function NavCircles({ currImg, setImg }: {
  currImg: number,
  setImg: (num: number) => void
}) {
  return (
    <div className={"flex gap-1 justify-center"}>
      {Array.from({ length: certificatesList.length },
        (_, i) => i).map((_, index) =>
        <Circle key={index}
                className={clsx(
                  currImg === index ? "text-gray-400" : "text-gray-300",
                  "fill-current cursor-pointer w-4"
                )}
                onClick={() => setImg(index)}
        />
      )}
    </div>
  );
}