"use client";

import ModalPortal from "@/components/modal-portal";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LogOutButton from "@/containers/sidebar-menu/log-out-button";
import links from "@/containers/sidebar-menu/links";

export default function SidebarMenu({ toggleSidebar }: {
  toggleSidebar: () => void
}) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      toggleSidebar();
    }, 300);
  };

  return (
    <ModalPortal wrapperId={"sidebar-menu"}>
      <>
        <div className={"fixed bg-gray-200/50 left-0 top-0 w-full h-full cursor-pointer z-40"}
             onClick={handleClose} />

        <div className={`fixed bg-white right-0 top-0 w-1/2 h-screen md:max-w-80 z-50 ${
          closing ? "animate-closeMenu" : "animate-openMenu"
        }`}>
          <div className={"h-[100dvh] flex flex-col justify-between py-4 mx-2"}>
            <div>
              {links.map((link, index) => (
                <Link key={index}
                      className={"flex justify-start items-center gap-4 rounded px-4 py-2 my-3 hover:bg-gray-200"}
                      href={link.href}
                >
                  <Image src={link.src}
                         alt={""}
                         width={30}
                         height={30}
                  />
                  <p className={"text-lg"}>
                    {link.caption}
                  </p>
                </Link>
              ))}
            </div>

            <LogOutButton />
          </div>
        </div>
      </>
    </ModalPortal>
  );
}