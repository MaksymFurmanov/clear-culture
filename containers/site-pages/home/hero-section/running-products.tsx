import Image from "next/image";
import heroSectionProducts from "@/containers/site-pages/home/hero-section/heroSectionProducts";
import clsx from "clsx";
import Link from "next/link";

export default function RunningProducts() {
  const duplicated = [...heroSectionProducts, ...heroSectionProducts];

  return (
    <div className="overflow-hidden mb-20">
      <div className="flex gap-4 animate-moveFull">
        {duplicated.map((img, index) => (
          <Link key={index} href={img.href}>
            <div className="flex items-center justify-center w-32 md:w-40 h-36
            p-2 overflow-hidden relative">
              <Image
                className={clsx(
                  img.rotate,
                  "object-contain max-h-full w-auto " +
                  "hover:scale-110 duration-200"
                )}
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}