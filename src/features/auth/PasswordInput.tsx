"use client";

import Eye from "@/public/img/login-module/eye.svg";
import ClosedEye from "@/public/img/login-module/closed-eye.svg";
import { InputHTMLAttributes, useState } from "react";

export default function PasswordInput({ label, ...props }: {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      {label && (
        <label className="block mb-2">
          {label}:
        </label>
      )}

      <div className={"flex flex-col"}>
        <input className={"py-2 px-4 bg-gray-200 rounded-xl"}
               type={showPassword ? "text" : "password"}
               placeholder={label}
               {...props}
        />

        <button className={"h-0 relative self-end -translate-y-7 -translate-x-4 cursor-pointer"}
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
      </div>
    </div>
  );
}