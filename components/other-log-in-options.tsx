"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function OtherLogInOptions({ type }: { type: "signIn" | "signUp" }) {
  const { push } = useRouter();

  const buttonString = type === "signIn" ? "Log In" : "Sign In";

  const logInWithGitHub = async () => {
    await signIn("github", { callbackUrl: "/" })
  }

  const logInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
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
          "flex items-center justify-center w-full mt-4 px-10 py-2 font-bold border border-black rounded-full cursor-pointer"
        }
        onClick={logInWithGoogle}
      >
        <FcGoogle className={"mr-2 inline-block h-6 w-6"} />
        {buttonString} with Google
      </button>

      <button
        className={
          "flex items-center justify-center w-full mt-4 px-10 py-2 font-bold border border-black rounded-full cursor-pointer"
        }
        onClick={logInWithGitHub}
      >
        <FaGithub className={"inline-block h-6 w-6 mr-2"} />
        {buttonString} with GitHub
      </button>

      <p className={"my-4 text-center"}>
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
