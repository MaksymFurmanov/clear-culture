"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { AlertType } from "@/src/shared/alerts/alerts.types";
import { useAlerts } from "@/src/app/providers/alert-provider";
import alertConfig from "@/src/shared/alerts/alerts.config";

export function Alert({ uid, title, children, type }: {
  uid: string,
  title: string,
  type: AlertType,
  children?: ReactNode,
}) {
  const { removeById } = useAlerts();

  const [alertToggle, setAlertToggle] = useState(false);

  const { color, icon: Icon } = alertConfig[type];

  useEffect(() => {
    const openTimer = setTimeout(() =>
      setAlertToggle(true), 100);
    const closeTimer = setTimeout(() =>
      setAlertToggle(false), alertConfig[type].time);

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
    flex gap-2 md:gap-4 items-center cursor-pointer
    bg-black border rounded-full py-3 px-8 mb-3
    transition-[opacity,clip-path,transform] duration-400 ease-in
    whitespace-nowrap
    ${alertToggle
      ? "opacity-100 clip-open"
      : "opacity-0 clip-closed"}
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
          <p className={"text-sm"}>
            {children}
          </p>
        )}
      </div>
    </div>
  );
}