"use client";

import CountUp from "react-countup";
import BrandPageButton from "@/containers/pages/home/running-numbers/brand-page-button";

export default function RunningNumbers() {
  return (
    <section>
      <div className={"flex justify-evenly items-start mb-16 mx-auto lg:max-w-180"}>
        <div className={"flex flex-col justify-center max-w-24"}>
          <CountUp className={"text-4xl text-center mb-2"}
                   end={8}
                   duration={3}
                   enableScrollSpy
          />
          <p className={"text-xl text-center"}>
            years on the market
          </p>
        </div>
        <div className={"flex flex-col justify-center"}>
          <CountUp className={"text-4xl text-center mb-2"}
                   end={8234}
                   duration={3}
                   enableScrollSpy
          />
          <p className={"text-xl text-center"}>
            trees planted
          </p>
        </div>
      </div>
      <BrandPageButton />
    </section>
  );
}