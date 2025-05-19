'use client';

import Image from "next/image";
import Arrow from "@/public/img/arrow.svg";
import Circle from "@/public/img/circle.svg";
import clsx from "clsx";
import useGallery from "@/hooks/useGallery";
import certificatesList from "@/data/certificates";

export default function CertificatesGallery() {
  const {
    currImg,
    prevImg,
    nextImg,
    setImg
  } = useGallery(certificatesList.length);

  return (
    <section className={"mb-16 mx-auto lg:max-w-180"}>
      <h2 className={"text-2xl text-center mb-10 md:text-3xl"}>
        Partners and certificates
      </h2>

      <div>
        <div className={"flex justify-center"}>
          <div className={"flex justify-between items-center w-4/5 mb-4"}>
            <Arrow className={"w-4 scale-x-[-1] cursor-pointer"}
                   onClick={prevImg}
            />

            <div className="relative w-full mx-auto max-h-40">
              <div className="overflow-hidden h-full">
                <div className="flex transition-transform duration-500 ease-in-out h-full"
                     style={{ transform: `translateX(-${currImg * 100}%)` }}
                >
                  {certificatesList.map((certificate, index) =>
                    <div
                      key={index}
                      className="flex-shrink-0 w-full flex items-center justify-center"
                    >
                      <Image
                        src={certificate.src}
                        alt={certificate.alt}
                        width={certificate.width}
                        height={200}
                        className="object-contain w-auto h-3/5"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Arrow className={"w-4 cursor-pointer"}
                   onClick={nextImg}
            />
          </div>
        </div>

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
      </div>
    </section>
  );
}