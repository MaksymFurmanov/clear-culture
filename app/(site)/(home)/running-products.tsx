import Image from "next/image";
import heroSectionProducts from "@/data/heroSectionProducts";
import clsx from "clsx";
import Link from "next/link";

export default function RunningGallery() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 animate-moveFull">
        {Array.from({ length: 2 }).map((_, i) =>
          heroSectionProducts.map((img, index) => (
            <Link key={`${i}/${index}`} href={img.href}>
              <div className="w-36 md:w-50">
                <Image
                  className={clsx(img.rotate)}
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}