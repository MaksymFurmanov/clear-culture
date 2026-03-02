import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";

export default function CatalogBtn() {
  return (
    <section className={"flex justify-center mb-8"}>
      <ScalingUnderlineBtn href={"/catalog/1"}
            className={"text-xl relative group md:text-2xl"}
      >
        Product catalog →
      </ScalingUnderlineBtn>
    </section>
  );
}