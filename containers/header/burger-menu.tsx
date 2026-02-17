"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SidebarMenu from "../sidebar-menu";
import Link from "next/link";

export default function BurgerMenu({ isAuth }: {
  isAuth: boolean
}) {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  useEffect(() => {
    if (sidebarToggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarToggle]);

  return !isAuth ? (
    <div className={"col-start-3 flex justify-end items-center gap-6 text-lg md:text-xl mr-4"}>
      <Link href={"/log-in"}>
        Log In
      </Link>
      <Link href={"/sign-up"} className={"hidden md:block"}>
        Sign Up
      </Link>
    </div>
  ) : (
    <>
      <div className={"col-start-3 flex justify-end"}>
        <button className={"cursor-pointer"}
                onClick={toggleSidebar}>
          <Image className={"w-6 transition duration-200 hover:scale-y-110"}
                 src={"/img/menu-button.svg"}
                 alt={"Menu"}
                 width={50}
                 height={50}
          />
        </button>
      </div>
      {sidebarToggle && (
        <SidebarMenu toggleSidebar={toggleSidebar} />
      )}
    </>
  );
}