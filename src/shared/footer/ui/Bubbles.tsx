import Image from "next/image";

export default function Bubbles() {
  return (
    <div
      className={"absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 lg:translate-y-10 w-[1457px] lg:w-full overflow-x-hidden -z-10"}
    >
      <Image className={"w-full h-auto object-bottom"}
             src={"/img/footer/bg-bubbles.svg"}
             alt={""}
             width={1457}
             height={367}
      />
    </div>
  );
}