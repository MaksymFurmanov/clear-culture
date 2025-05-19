import ScalingUnderlineLink from "@/components/scaling-underline-link";

export default function CatalogButton() {
  return (
    <section className={"flex justify-center mb-8"}>
      <ScalingUnderlineLink href={"/catalog/1"}
            className={"text-xl relative group md:text-2xl"}
      >
        Product catalog →
      </ScalingUnderlineLink>
    </section>
  );
}