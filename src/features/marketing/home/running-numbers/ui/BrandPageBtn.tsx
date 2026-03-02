import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";

export default function BrandPageBtn() {
  return (
    <section className={"flex justify-center mb-12"}>
      <ScalingUnderlineBtn href={"/about-us"}
                            className={"text-xl relative group md:text-2xl"}
      >
        More about Clear Culture →
      </ScalingUnderlineBtn>
    </section>
  );
}