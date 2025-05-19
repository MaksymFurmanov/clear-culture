"use client";

import Image from "next/image";

export default function AdvantagesBubbles() {
  return (
    <div className={"overflow-hidden"}>
      <div className={"relative left-1/2 -translate-x-1/2 w-[786px] md:w-full"}>
        <Image className={"w-full h-auto object-center"}
               src={"/img/home/advantages-full.svg"}
               alt={"Advantages"}
               width={786}
               height={343}
        />
      </div>
    </div>
  );
}