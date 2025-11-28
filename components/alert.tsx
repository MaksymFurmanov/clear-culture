"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { useAlerts } from "@/app/providers/alert-provider";
import { FaTrash } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";

const alertConfig = {
  success: {
    color: "#22C55E",
    icon: FaCheck
  },
  removing: {
    color: "#6B7280",
    icon: FaTrash
  },
  warning: {
    color: "#EAB308",
    icon: IoIosWarning
  },
  error: {
    color: "#EF4444",
    icon: RxCrossCircled
  }
} as const;

export type AlertType = keyof typeof alertConfig;

export function Alert({ uid, title, children, type }: {
  uid: string,
  title: string,
  type: AlertType,
  children?: ReactNode,
}) {
  const {removeById} = useAlerts();

  const [alertToggle, setAlertToggle] = useState(false);

  const { color, icon: Icon } = alertConfig[type];

  useEffect(() => {
    const openTimer = setTimeout(() => setAlertToggle(true), 100);
    const closeTimer = setTimeout(() => setAlertToggle(false), 4500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const closeHandler = () => {
    setAlertToggle(false);
    setTimeout(() => {
      removeById(uid);
    }, 500);
  };

  return (

    <div className={`
      flex gap-2 md:gap-4 items-center overflow-hidden cursor-pointer
      bg-black border rounded-full py-3 px-8 mb-3
      transition-[max-width,opacity,margin,transform] duration-500 ease-in-out
      ${alertToggle
      ? "max-w-80 opacity-100 mx-3"
      : "max-w-0 opacity-0 mx-0"}
      `}
         onClick={closeHandler}
         style={{ color }}
    >
      <Icon />
      <div>
        <b className={"whitespace-nowrap"}>
          {title}
        </b>
        {children && (
          <p>
            {children}
          </p>
        )}
      </div>
    </div>
  );
}