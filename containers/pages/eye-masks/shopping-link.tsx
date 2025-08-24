import Image from "next/image";
import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";

export default function ShoppingLink() {
  return (
    <div className={"flex flex-col"}>
      <div className={"mt-12 mb-6"}>
        <Image className={"w-full max-w-60 rounded-lg border border-gray-300"}
               src={"/img/eye-masks/eye-mask-1.jpg"}
               alt={"Eye masks"}
               width={300}
               height={300}
        />
      </div>

      <div>
        <h1 className={"text-3xl mb-2 md:text-3xl"}>
          Reusable <br />
          Eye Masks
        </h1>

        <ScalingUnderlineLink href={""}
                              className={"text-lg md:text-2xl"}>
          Shop now →
        </ScalingUnderlineLink>
      </div>
    </div>
  );
}