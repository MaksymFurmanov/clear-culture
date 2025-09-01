import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";

export default function BrandPageButton() {
  return (
    <section className={"flex justify-center mb-12"}>
      <ScalingUnderlineLink href={"/about-us"}
                            className={"text-xl relative group md:text-2xl"}
      >
        More about Clear Culture →
      </ScalingUnderlineLink>
    </section>
  );
}