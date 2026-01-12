"use client";

import PasswordInput from "@/components/password-input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginInput, loginSchema } from "@/lib/validators/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/form-error";
import { login } from "@/lib/actions/user";

export default function Form() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password);
      push("/");
    } catch (e) {
      setError("password", { message: "Wrong email or password" });
      return;
    }
  };

  return (
    <form
      className="flex flex-col w-2/3 mt-4 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="block">
        Email:
      </label>
      <input className={"my-2 py-3 px-4 bg-gray-200 rounded-xl"}
             type={"email"}
             placeholder={"Email"}
             {...register("email")}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}

      <PasswordInput label={"Password"}
                     {...register("password")}
      />
      {errors.password && <FormError>{errors.password.message}</FormError>}

      <Link className={"mt-2 text-right text-sm text-gray-400 cursor-pointer"}
            href={"/reset-password"}>
        Forgot password?
      </Link>

      <button className={"block mt-4 py-2 px-16 bg-black rounded-full text-white cursor-pointer disabled:bg-gray-500"}
              type={"submit"}
              disabled={isSubmitting}
      >
        Log In
      </button>
    </form>
  );
}