"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

export default function LogOutButton() {
  return (
    <button
      className={"flex justify-start items-center gap-4 w-full cursor-pointer rounded px-4 py-2 my-3 hover:bg-gray-200"}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <Image src={"/img/sidebar/logout.svg"}
             alt={""}
             width={30}
             height={30}
      />
      <p className={"text-lg"}>
        Log out
      </p>
    </button>
  );
}