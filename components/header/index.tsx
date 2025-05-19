'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarMenu from "@/components/sidebar-menu";

export default function Header() {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>();

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  useEffect(() => {
    if (sidebarToggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarToggle]);

  return (
    <>
      <header
        className={"relative bg-light-green grid grid-cols-3 items-center justify-items-stretch z-30 py-2 px-4 lg:py-4 lg:px-6"}>
        <div className={"col-start-2 flex justify-center"}>
          <Link href="/">
            <Image className={"w-20 lg:w-24"}
                   src="/img/logo/logo-no-background.svg"
                   alt="Logo"
                   width={100}
                   height={100}
            />
          </Link>
        </div>

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
      </header>

      {sidebarToggle && (
        <SidebarMenu toggleSidebar={toggleSidebar}/>
      )}
    </>
  );
}