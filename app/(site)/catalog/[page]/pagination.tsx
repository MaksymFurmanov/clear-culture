import ScalingUnderlineLink from "@/components/scaling-underline-link";
import Link from "next/link";

export default function Pagination({ page, pageAmount }: {
  page: number,
  pageAmount: number,
}) {
  if(pageAmount < 2) return null;

  return (
    <div className={"text-base md:text-lg lg:text-xl flex justify-around items-center w-full my-8"}>
      {page > 1 && (
        <ScalingUnderlineLink href={`/catalog/${page - 1}`}>
          ← Prev.
        </ScalingUnderlineLink>
      )}

      {Array.from({ length: pageAmount }).map((_, i) => {
        return (
          <Link href={`/catalog/${i + 1}`} key={i + 1}>
            {i + 1}
          </Link>
        );
      })}

      {page < pageAmount && (
        <ScalingUnderlineLink href={`/catalog/${page + 1}`}>
          Next →
        </ScalingUnderlineLink>
      )}
    </div>
  );
}