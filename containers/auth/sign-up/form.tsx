"use client";

import PasswordInput from "@/components/password-input";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";
import FormError from "@/components/form-error";

export default function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });

  async function onSubmit(data: RegisterInput) {
    try {
      await registerUser(data);
      router.push("/log-in");
    } catch (e: any) {
      if (e.message.includes("email")) {
        setError("email", { message: e.message });
      } else {
        setError("password", { message: e.message });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
          className={"flex flex-col gap-3 w-2/3 mt-4 mx-auto"}>
      <div>
        <label className={"block mb-2"}>Name:</label>
        <input className={"w-full bg-gray-200 rounded-xl py-2 px-4"}
               {...register("name")}
               placeholder={"Name"}
        />
      </div>
      {errors.name && <FormError>{errors.name.message}</FormError>}

      <div>
        <label className={"block mb-2"}>Email:</label>
        <input className={"w-full bg-gray-200 rounded-xl py-2 px-4"}
               {...register("email")}
               placeholder={"Email"}
        />
      </div>
      {errors.email && <FormError>{errors.email.message}</FormError>}

      <PasswordInput label={"Password"} {...register("password")} />
      {errors.password && <FormError>{errors.password.message}</FormError>}

      <PasswordInput label={"Confirm Password"} {...register("confirmPassword")} />
      {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}

      <button className={"py-2 px-16 bg-black rounded-full text-white cursor-pointer disabled:bg-gray-500 mt-4"}
              type={"submit"}
              disabled={isSubmitting}
      >
        Sign Up
      </button>
    </form>
  );
}