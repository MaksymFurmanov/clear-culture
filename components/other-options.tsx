"use client";

import GoogleIcon from "@/public/img/login-module/google.svg";
import AppleIcon from "@/public/img/login-module/apple.svg";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function OtherOptions({ type }: { type: "signIn" | "signUp" }) {
  const { push } = useRouter();

  const buttonString = type === "signIn" ? "Log In" : "Sign In";

  //Front-end hosting placeholder
  const logIn = () => {
    const userId = "user";
    Cookies.set("session", userId);
    window.location.href = "/";
  };

  return (
    <div className={"mt-2 mx-auto w-2/3"}>
      <div className={"mt-8"}>
        <hr />
        <div className={"w-24 mx-auto bg-white relative z-10 -translate-y-3"}>
          <p className={"m-0 p-0 text-center text-sm"}>or</p>
        </div>
      </div>

      <button
        className={
          "block w-full mt-4 px-10 py-3 font-bold border border-black rounded-full cursor-pointer"
        }
        onClick={logIn}
      >
        <GoogleIcon className={"mr-2 inline-block h-6 w-6"} />
        {buttonString} with Google
      </button>

      <button
        className={
          "block w-full mt-4 px-10 py-3 font-bold border border-black rounded-full cursor-pointer"
        }
        onClick={logIn}
      >
        <AppleIcon className={"inline-block h-6 w-6 mr-2"} />
        {buttonString} with Apple
      </button>

      <p className={"mt-4 mb-8 text-center"}>
        {type === "signIn" ? "Don't" : "Already"} have an account?&nbsp;
        <span className={"font-bold cursor-pointer"}
              onClick={(e) => {
                e.preventDefault();
                push(type === "signIn" ? "/sign-up" : "/log-in");
              }}>
          {type === "signIn" ? "Sign Up" : "Sign In"}
        </span>
      </p>
    </div>
  );
}
