"use client";

import PasswordInput from "@/components/password-input";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterInput, registerSchema } from "@/lib/validators/auth";
import FormError from "@/components/form-error";

export default function SignUpForm() {
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
          className={"flex flex-col w-2/3 mt-4 mx-auto"}>
      <label>Name:</label>
      <input className={"my-2 py-2 px-4 bg-gray-200 rounded-xl"}
             {...register("name")}
             placeholder={"Name"}
      />
      {errors.name && <FormError>{errors.name.message}</FormError>}

      <label>Email:</label>
      <input className={"mt-2 py-2 px-4 bg-gray-200 rounded-xl"}
             {...register("email")}
             placeholder={"Email"}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}

      <PasswordInput label={"Password"} {...register("password")} />
      {errors.password && <FormError>{errors.password.message}</FormError>}

      <PasswordInput label={"Confirm Password"} {...register("confirmPassword")} />
      {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}

      <button className={"mt-4 py-3 px-16 bg-black rounded-full text-white cursor-pointer disabled:bg-gray-500"}
              type={"submit"}
              disabled={isSubmitting}
      >
        Sign Up
      </button>
    </form>
  );
}