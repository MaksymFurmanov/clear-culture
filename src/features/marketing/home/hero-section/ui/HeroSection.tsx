import Bubbles from "@/src/features/marketing/home/hero-section/ui/Bubbles";
import RunningProducts from "@/src/features/marketing/home/hero-section/ui/RunningProducts";
import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";

export default function HeroSection() {
  return (
    <section>
      <div className={"px-4 ml-[5%] mt-8"}>
        <h1 className={"text-3xl mb-2 max-w-4/5 md:text-5xl md:mb-4 lg:max-w-1/2"}>
          “The Earth is what we all have in common.”
        </h1>
        <p className={"text-lg md:text-2xl"}>
          - Wendell Berry
        </p>
      </div>

      <Bubbles />

      <div className={"flex justify-end"}>
        <ScalingUnderlineBtn href={"/catalog/1"}
                              className={"text-xl bottom-6 right-6 md:text-2xl md:right-20 md:bottom-20 lg:bottom-44 lg:right-30"}>
          Explore our products →
        </ScalingUnderlineBtn>
      </div>

      <RunningProducts />
    </section>
  );
}