"use client";

import Eye from "@/public/img/login-module/eye.svg";
import ClosedEye from "@/public/img/login-module/closed-eye.svg";
import { InputHTMLAttributes, useState } from "react";

export default function PasswordInput({ label, ...props }: {
  label: string
} & InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <label className="mt-3 block">
        {label}:
      </label>

      <input className={"mt-2 py-2 px-4 bg-gray-200 rounded-xl"}
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
    </>
  );
}