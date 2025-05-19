import Image from "next/image";
import ScalingUnderlineLink from "@/components/scaling-underline-link";

export default function EyeMasksArticlePreview() {
  return (
    <section className={"mb-16 mx-auto lg:max-w-180"}>
      <Image className={"w-full mx-auto lg:rounded lg:border border-gray-300 lg:w-4/5"}
             src={"/img/home/pads-background.jpg"}
             alt={"Eye masks preview"}
             width={800}
             height={480}
      />
      <div className={"mx-auto lg:max-w-3/4"}>
        <p className={"text-center text-lg py-[min(1.5em,10%)] px-[min(2em,10%)] md:text-2xl lg:my-4"}>
          Reusable eye masks are eco-friendly and comfortable. They provide relief for tired eyes, block out light for
          better sleep, and reduce waste compared to disposable options.
        </p>
        <div className={"flex justify-end mr-4"}>
          <ScalingUnderlineLink className={"text-base relative group md:text-xl"}
                                href={"/eye-masks"}>
            Read more →
          </ScalingUnderlineLink>
        </div>
      </div>
    </section>
  );
}