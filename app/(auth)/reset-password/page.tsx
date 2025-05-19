'use client';

import ArrowLeft from "@/public/img/login-module/arrow-left.svg";
import { useRouter } from "next/navigation";
import Form from "@/app/(auth)/reset-password/form";

export default function ResetPasswordPage() {
  const {back} = useRouter();

  return (
    <main className={"w-2/3 mt-4 mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>Reset password</h1>

      <Form />

      <button className={
        "flex items-center justify-center w-2/3 mx-auto mt-6 px-10 py-3 font-bold border border-black rounded-full"
      }
              onClick={(e) => {
                e.preventDefault();
                back();
              }}
      >
        <ArrowLeft className={"inline-block h-5 w-5 mr-2"} />
        Back to Log In
      </button>
    </main>
  );
}
