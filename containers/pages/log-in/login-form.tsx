'use client';

import { useFormStatus } from "react-dom";
import PasswordInput from "@/components/password-input";
import ForgetPasswordBtn from "@/containers/pages/log-in/forget-password-btn";
import Cookies from 'js-cookie';

export default function LoginForm() {
  //const [state, loginAction] = useActionState(log-in, undefined);

  //Front-end hosting placeholder
  const logIn = () => {
    const userId = "user";
    Cookies.set('session', userId);
    window.location.href = "/";
  }

  return (
    <form className={"flex flex-col w-2/3 mt-4 mx-auto"}
          action={logIn}
    >
      <label className="block">
        Phone number:
      </label>
      <input className={"mt-2 py-3 px-4 bg-gray-200 rounded-xl"}
             placeholder={"Phone"}
             name={"phoneNumber"}
      />

      <PasswordInput name={"password"}>
        Password
      </PasswordInput>

      <ForgetPasswordBtn />

{/*      {state?.errors?.phoneNumber && (
        <p className={"text-red-500"}>
          {state.errors.phoneNumber.toString()}
        </p>
      )}*/}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={"block mt-4 py-3 px-16 bg-black rounded-full text-white cursor-pointer"}
            disabled={pending}
            type={"submit"}
    >
      Log In
    </button>
  );
}