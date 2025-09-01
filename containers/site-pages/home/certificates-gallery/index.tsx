"use client";

import Arrow from "@/public/img/arrow.svg";
import useGallery from "@/hooks/useGallery";
import certificatesList from "@/containers/site-pages/home/certificates-gallery/certificates";
import NavCircles from "@/containers/site-pages/home/certificates-gallery/nav-circles";
import CertificatesImages from "@/containers/site-pages/home/certificates-gallery/certificates-images";

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