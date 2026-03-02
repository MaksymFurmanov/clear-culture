"use client";

import Arrow from "@/src/public/svg/arrow.svg";
import useGallery from "@/src/shared/hooks/use-gallery";
import certificatesList from "@/src/features/marketing/home/certificates-gallery/certificates";
import CertificatesImages from "@/src/features/marketing/home/certificates-gallery/ui/CertificatesImages";
import NavCircles from "@/src/features/marketing/home/certificates-gallery/ui/NavCircles";

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

            <CertificatesImages currImg={currImg}/>

            <Arrow className={"w-4 cursor-pointer"}
                   onClick={nextImg}
            />
          </div>
        </div>

        <NavCircles currImg={currImg}
                    setImg={setImg}
        />
      </div>
    </section>
  );
}