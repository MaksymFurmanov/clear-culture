import Link from "next/link";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";
import { getProductGroupsCount } from "@/src/lib/actions/product-group";

export default async function Pagination({ page }: {
  page: number
}) {
  const groupsNum = await getProductGroupsCount();
  const pageAmount = Math.ceil(groupsNum / 6);

  if (page > pageAmount || page < 1)
    throw new PageNotFoundError("Page in catalog not found");

  return pageAmount > 2 && (
    <div className={"text-base md:text-lg lg:text-xl " +
      "flex justify-around items-center w-full my-8"}>
      {page > 1 && (
        <ScalingUnderlineBtn href={`/catalog/${page - 1}`}>
          ← Prev.
        </ScalingUnderlineBtn>
      )}

      {Array.from({ length: pageAmount }).map((_, i) => {
        return (
          <Link href={`/catalog/${i + 1}`} key={i + 1}>
            {i + 1}
          </Link>
        );
      })}

      {page < pageAmount && (
        <ScalingUnderlineBtn href={`/catalog/${page + 1}`}>
          Next →
        </ScalingUnderlineBtn>
      )}
    </div>
  );
}