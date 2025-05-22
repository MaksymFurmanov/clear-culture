'use client';

import Eye from "@/public/img/login-module/eye.svg";
import ClosedEye from "@/public/img/login-module/closed-eye.svg";
import { useState } from "react";

export default function PasswordInput({ children, name = "" }:
                                        { children: string, name?: string}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <label className="mt-3 block">
        {children}:
      </label>

      <input className={"mt-2 py-3 px-4 bg-gray-200 rounded-xl"}
             placeholder={children}
             name={name}
      />

      <button className={"h-0 relative self-end -translate-y-8 -translate-x-4 cursor-pointer"}
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
      >
        {showPassword ? (
          <Eye className={"relative"}
               style={{ transform: "translateY(0.075em)" }}
          />
        ) : (
          <ClosedEye />
        )}
      </button>
    </>
  );
}