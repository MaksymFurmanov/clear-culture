import Image from "next/image";
import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";

export default function Introduction() {
  return (
    <section className={"flex justify-evenly gap-4 md:justify-between max-w-150 mx-4 md:mx-auto md:mx-0 mt-6 mb-10"}>
      <div className={"py-8 mt-2"}>
        <h1 className={"text-3xl mb-4"}>
          Reusable <br />
          Notebook
        </h1>
        <ScalingUnderlineLink href={"/public"}
                              className={"text-xl"}>
          Shop now →
        </ScalingUnderlineLink>
      </div>

      <Image className={"w-1/2 md:w-4/5 object-contain"}
             src={"/img/reusable-notebook/notebook-main.png"}
             alt={"Notebook black"}
             width={300}
             height={600}
      />
    </section>
  );
}