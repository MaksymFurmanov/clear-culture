"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getChangePasswordTokenWithPrevPassword } from "@/src/lib/actions/change-password";
import { LoginInput } from "@/src/features/auth/log-in/login.schema";
import PasswordInput from "@/src/features/auth/PasswordInput";
import FormError from "@/src/shared/FormError";
import WithoutPrevPasswordBtn from "@/src/features/auth/change-password/ui/WithoutPrevPasswordBtn";

export default function PreviousPasswordForm() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>();

  const submitHandler = async (data: { password: string }) => {
    try {
      const changePasswordToken =
        await getChangePasswordTokenWithPrevPassword(data.password);

      if (!changePasswordToken) {
        setError("password", { message: "Incorrect password" });
        return;
      }

      push(`/new-password?token=${changePasswordToken}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={"flex flex-col w-2/3 mt-4 mx-auto"}
          onSubmit={handleSubmit(submitHandler)}>
      <label className={"text-2xl mb-4"}>
        Enter your current password
      </label>

      <PasswordInput{...register("password")} />

      {errors.password?.message && (
        <FormError>{errors.password?.message}</FormError>
      )}

      <WithoutPrevPasswordBtn />

      <button className={"text-lg mt-4 py-1 px-12 w-fit bg-black text-white " +
        "rounded-full cursor-pointer disabled:bg-gray-500 hover:bg-gray-800"}
              disabled={isSubmitting}
              type={"submit"}
      >
        Next
      </button>
    </form>
  );
}