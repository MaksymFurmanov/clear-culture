"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function OtherAuthOptions({ registered }: { registered: boolean }) {
  const buttonString = registered ? "Log In" : "Sign In";

  return (
    <div className={"mt-2 mx-auto w-2/3"}>
      <div className={"mt-8"}>
        <hr />
        <div className={"w-24 mx-auto bg-white relative z-10 -translate-y-3"}>
          <p className={"m-0 p-0 text-center text-sm"}>or</p>
        </div>
      </div>

      <GoogleOption buttonString={buttonString} />

      <GithubOption buttonString={buttonString} />

      <SwitchForms registered={registered}/>
    </div>
  );
}

const GoogleOption = ({ buttonString }: {
  buttonString: string
}) => {
  const logInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <button
      className={
        "flex items-center justify-center w-full mt-4 px-10 py-2 font-bold border border-black rounded-full cursor-pointer"
      }
      onClick={logInWithGoogle}
    >
      <FcGoogle className={"mr-2 inline-block h-6 w-6"} />
      {buttonString} with Google
    </button>
  );
};

const GithubOption = ({ buttonString }: {
  buttonString: string
}) => {
  const logInWithGitHub = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  return (
    <button
      className={
        "flex items-center justify-center w-full mt-4 px-10 py-2 font-bold border border-black rounded-full cursor-pointer"
      }
      onClick={logInWithGitHub}
    >
      <FaGithub className={"inline-block h-6 w-6 mr-2"} />
      {buttonString} with GitHub
    </button>
  );
}

const SwitchForms = ({registered}: {
  registered: boolean
}) => {
  const { push } = useRouter();

  return (
    <p className={"my-4 text-center"}>
      {registered ? "Don't" : "Already"} have an account?&nbsp;
      <span className={"font-bold cursor-pointer"}
            onClick={(e) => {
              e.preventDefault();
              push(registered ? "/sign-up" : "/log-in");
            }}>
          {registered ? "Sign Up" : "Log In"}
        </span>
    </p>
  );
}