'use client';

import Circle from "../../public/img/circle.svg";

export default function Colors() {
  return (
    <aside className={"flex flex-col items-end gap-2"}>
      <p className={"text-xl md:text-2xl text-right mb-1"}>
        4 color types and <br/>
        transparent one
      </p>
      <div className={"flex gap-2"}>
        <Circle className={"w-8 h-auto fill-[#4BB852] stroke-black/50"}/>
        <Circle className={"w-8 h-auto fill-[#FD287B] stroke-black/50"}/>
        <Circle className={"w-8 h-auto fill-[#E89F4F] stroke-black/50"}/>
        <Circle className={"w-8 h-auto fill-[#877CB4] stroke-black/50"}/>
        <Circle className={"w-8 h-auto fill-[#FAF7F4] stroke-black/50"}/>
      </div>
    </aside>
  );
}