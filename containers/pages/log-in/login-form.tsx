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
      <label>Name:</label>
      <input name="name" placeholder="Name" className="mt-2 py-3 px-4 bg-gray-200 rounded-xl" required />

      <label className="mt-4">Email:</label>
      <input name="email" type="email" placeholder="Email" className="mt-2 py-3 px-4 bg-gray-200 rounded-xl" required />

      <PasswordInput name={"password"}>
        Password
      </PasswordInput>

      <ForgetPasswordBtn />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={"block mt-4 py-2 px-16 bg-black rounded-full text-white cursor-pointer"}
            disabled={pending}
            type={"submit"}
    >
      Log In
    </button>
  );
}