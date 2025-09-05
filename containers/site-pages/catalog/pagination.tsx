import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";
import Link from "next/link";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { getProductGroupsCount } from "@/lib/actions/product-group";

export default async function Pagination({ page }: {
  page: number
}) {
  const groupsNum = await getProductGroupsCount();
  const pageAmount = Math.ceil(groupsNum / 6);

  if (page > pageAmount || page < 1) throw new PageNotFoundError("Page in catalog not found");

  return pageAmount > 2 && (
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