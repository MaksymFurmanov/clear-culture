'use client';

import { useRouter } from "next/navigation";

export default function ForgetPasswordBtn() {
  const { push } = useRouter();

  return (
    <button className={"mt-2 text-right text-sm text-gray-400 cursor-pointer"}
            onClick={(e) => {
              e.preventDefault();
              push("/reset-password");
            }}
    >
      Forgot password?
    </button>
  );
}