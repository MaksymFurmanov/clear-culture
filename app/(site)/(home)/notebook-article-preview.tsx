import Image from "next/image";
import ScalingUnderlineLink from "@/components/scaling-underline-link";

export default function NotebookArticlePreview() {
  return (
    <section className={"my-8 mx-auto lg:max-w-180"}>
      <Image className={"w-full lg:rounded lg:border border-gray-300 mx-auto lg:w-4/5"}
             src={"/img/home/notebook-1.jpg"}
             alt={"Notebook preview"}
             width={800}
             height={480}
      />
      <div className={"mx-auto lg:max-w-3/4"}>
        <p className={"text-center text-lg py-[min(1.5em,10%)] px-[min(2em,10%)] md:text-2xl lg:my-4"}>
          The eco-friendly reusable notebook syncs with a mobile app for easy duplication and access on the go. Write,
          erase, reuse, and keep notes digitally preserved.
        </p>
        <div className={"flex justify-end mr-8"}>
          <ScalingUnderlineLink href={"/reusable-notebook"}
                                className={"text-base relative group md:text-xl"}>
            Read more →
          </ScalingUnderlineLink>
        </div>
      </div>
    </section>
  );
}