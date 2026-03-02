import Image from "next/image";
import certificatesList from "@/src/features/marketing/home/certificates-gallery/certificates";

export default function CertificatesImages({ currImg }: {
  currImg: number
}) {
  return (
    <div className={"relative w-full mx-auto max-h-40"}>
      <div className={"overflow-hidden h-full"}>
        <div className={"flex transition-transform " +
          "duration-500 ease-in-out h-full"}
             style={{ transform: `translateX(-${currImg * 100}%)` }}
        >
          {certificatesList.map((certificate, index) => (
            <div key={index}
                 className={"flex-shrink-0 w-full flex " +
                   "items-center justify-center"}
            >
              {(
                typeof certificate.src === "string" &&
                typeof certificate.alt === "string" &&
                typeof certificate.width === "number" &&
                typeof certificate.height === "number"
              ) ? (
                <Image className={"object-contain w-auto"}
                       src={certificate.src}
                       alt={certificate.alt}
                       width={certificate.width}
                       height={certificate.height}
                />
              ) : (
                <p>No Image</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}