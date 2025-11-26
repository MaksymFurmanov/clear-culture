"use client";

import React, { ReactNode, useEffect, useState } from "react";
import ModalPortal from "@/components/modal-portal";

export function Alert({ label, closeCallback, children, icon }: {
  label: string,
  closeCallback: () => void,
  children?: ReactNode,
  icon?: ReactNode,
}) {
  const [alertToggle, setAlertToggle] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setAlertToggle(true);
    }, 500);

    setTimeout(() => {
      setAlertToggle(false);
      closeCallback();
    }, 7000);

    return () => {
      setAlertToggle(false);
    };
  }, []);

  const closeHandler = () => {
    setAlertToggle(false);
  }

  return (
    <ModalPortal wrapperId={"global-alert"}>
      <div className={`
      flex gap-4 items-center fixed bottom-8 left-8 overflow-hidden cursor-pointer
      bg-black text-green-500 border rounded-full py-4 px-8
      transition-[max-width,opacity,margin,transform] duration-500 ease-in-out
      ${alertToggle
        ? "max-w-80 opacity-100 mx-3"
        : "max-w-0 opacity-0 mx-0"}
      `}
           onClick={closeHandler}>
        {icon && icon}
        <div>
          <b className={"whitespace-nowrap"}>
            {label}
          </b>
          {children && (
            <p>
              {children}
            </p>
          )}
        </div>
      </div>
    </ModalPortal>
  );
}