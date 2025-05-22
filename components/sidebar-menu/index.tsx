"use client";

import ModalPortal from "@/components/modal-portal";
import { IconLink } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/lib/actions";
import { useState } from "react";

const links: IconLink[] = [
  {
    label: "Cart",
    href: "/cart",
    iconHref: "/img/sidebar/cart.svg"
  },
  {
    label: "Product catalog",
    href: "/catalog/1",
    iconHref: "/img/sidebar/product-catalog.svg"
  },
  {
    label: "Favorites",
    href: "/favorites",
    iconHref: "/img/sidebar/favorites.svg"
  },
  {
    label: "Orders",
    href: "/orders",
    iconHref: "/img/sidebar/orders.svg"
  }
];

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
          <div className={"h-full flex flex-col justify-between py-4 mx-2"}>
            <div>
              {links.map((link, index) => (
                <Link key={index}
                      className={"flex justify-start items-center gap-4 rounded px-4 py-2 my-3 hover:bg-gray-200"}
                      href={link.href}
                >
                  <Image src={link.iconHref}
                         alt={""}
                         width={30}
                         height={30}
                  />
                  <p className={"text-lg"}>
                    {link.label}
                  </p>
                </Link>
              ))}
            </div>

            <button
              className={"flex justify-start items-center gap-4 w-full cursor-pointer rounded px-4 py-2 my-3 hover:bg-gray-200"}
              onClick={logout}
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
          </div>
        </div>
      </>
    </ModalPortal>
  );
}