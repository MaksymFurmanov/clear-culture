'use client';

import Link from "next/link";
import InstaIcon from "@/public/img/footer/insta-icon.svg";
import FacebookIcon from "@/public/img/footer/facebook-icon.svg";
import TwitterIcon from "@/public/img/footer/twitter-icon.svg";

export default function Contacts() {
  return (
    <div className={"text-xl text-right overflow-visible"}>
      <div className={"flex justify-end gap-3 mb-3"}>
        <Link href={""}>
          <InstaIcon className={"w-7 md:w-8"}/>
        </Link>
        <Link href={""}>
          <FacebookIcon className={"w-7 md:w-8"}/>
        </Link>
        <Link href={""}>
          <TwitterIcon className={"w-7 md:w-8"}/>
        </Link>
      </div>

      <p className={"text-base mb-2 md:text-lg lg:text-xl"}>
        +421 222 222 222
      </p>

      <p className={"text-base md:text-lg lg:text-xl"}>
        furmanov.maksym@gmail.com
      </p>
    </div>
  );
}