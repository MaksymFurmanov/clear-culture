'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import PasswordInput from "@/components/password-input";
import ForgetPasswordBtn from "@/app/(auth)/login/forget-password-btn";
import { login } from "@/lib/actions";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction}
          className={"flex flex-col w-2/3 mt-4 mx-auto"}
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

      {state?.errors?.phoneNumber && (
        <p className={"text-red-500"}>
          {state.errors.phoneNumber.toString()}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={"block mt-4 py-3 px-16 bg-black rounded-full text-white"}
            disabled={pending}
            type={"submit"}
    >
      Log In
    </button>
  );
}