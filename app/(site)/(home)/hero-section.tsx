import RunningProducts from "@/app/(site)/(home)/running-products";
import ScalingUnderlineLink from "@/components/scaling-underline-link";
import Bubbles from "@/app/(site)/(home)/bubbles";

export default function HeroSection() {

  return (
    <section className={"mb-30"}>
      <div className={"px-4 ml-[5%] mt-8"}>
        <h1 className={"text-3xl mb-2 max-w-4/5 md:text-5xl md:mb-4 lg:max-w-1/2"}>
          “The Earth is what we all have in common.”
        </h1>
        <p className={"text-lg md:text-2xl"}>
          - Wendell Berry
        </p>
      </div>

      <Bubbles />

      <div className={"flex justify-end mb-4"}>
        <ScalingUnderlineLink href={"/catalog/1"}
                              className={"text-xl bottom-6 right-6 md:text-2xl md:right-20 md:bottom-20 lg:bottom-44 lg:right-30"}>
          Explore our products →
        </ScalingUnderlineLink>
      </div>

      <RunningProducts />
    </section>
  );
}