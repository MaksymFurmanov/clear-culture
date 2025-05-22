'use client';

import PasswordInput from "@/components/password-input";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Form() {
  const router = useRouter();
  const signUp = () => {
    const userId = "user";
    Cookies.set("session", userId);
    router.replace("/");
  };

  return (
    <form className={"flex flex-col w-2/3 mt-4 mx-auto"}
          action={signUp}>
      <label className="block">
        Phone number:
      </label>
      <input className={"mt-2 py-3 px-4 bg-gray-200 rounded-xl"}
             placeholder={"Phone"}
      />

      <PasswordInput name={"password"}>
        Password
      </PasswordInput>

      <PasswordInput>
        Reset password
      </PasswordInput>

      <button className={"block mt-8 py-3 px-16 bg-black rounded-full text-white cursor-pointer"}>
        Log In
      </button>
    </form>
  );
}