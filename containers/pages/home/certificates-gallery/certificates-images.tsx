import certificatesList from "@/containers/pages/home/certificates-gallery/certificates";
import Image from "next/image";

export default function CertificatesImages({ currImg }: {
  currImg: number
}) {
  return (
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
                height={certificate.height}
                className="object-contain w-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}