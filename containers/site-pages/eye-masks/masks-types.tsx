import Image from "next/image";

export default function MasksTypes() {
  return (
    <section>
      <div className={"block md:hidden w-full"}>
        <Image className={"w-full"}
               src={"/img/eye-masks/types-bubbles-small.svg"}
               alt={""}
               width={441}
               height={488}
        />
      </div>

      <div className={"hidden md:block w-[calc(100dvw+1em)] relative left-1/2 -translate-x-1/2"}>
        <Image className={"w-full object-center"}
               src={"/img/eye-masks/types-bubbles.svg"}
               alt={""}
               width={1908}
               height={1300}
        />
      </div>
    </section>
  );
}