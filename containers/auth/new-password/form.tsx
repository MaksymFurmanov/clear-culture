"use client";

import PasswordInput from "@/components/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordInput, newPasswordSchema } from "@/lib/validators/new-password";
import FormError from "@/components/form-error";
import { changePassword } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/alert";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function NewPasswordForm({ token }: {
  token: string
}) {
  const { push } = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema)
  });

  const submitHandler = async (data: NewPasswordInput) => {
    try {
      await changePassword(token, data.password);

      setShowSuccessAlert(true);
      setTimeout(() => {
        push("/");
      }, 200);

    } catch (e) {
      if (e instanceof Error) {
        setError("repeatPassword", { message: e.message });
      } else {
        setError("repeatPassword", { message: "Unexpected error occurred" });
      }
    }
  };

  return (
    <form className={"flex flex-col gap-2"}
          onSubmit={handleSubmit(submitHandler)}>
      <PasswordInput label={"New password"}
                     {...register("password")}
      />
      <FormError>{errors.password?.message}</FormError>

      <PasswordInput label={"Repeat new password"}
                     {...register("repeatPassword")}
      />
      <FormError>{errors.repeatPassword?.message}</FormError>

      <button className={"text-lg py-1 px-12 w-fit bg-black text-white " +
        "rounded-full cursor-pointer disabled:bg-gray-500 hover:bg-gray-800"}
              type={"submit"}
              disabled={isSubmitting}>
        Save
      </button>
      {showSuccessAlert && (
        <Alert icon={<FaCheck />}
               label={"Password changed successfully"}
               closeCallback={() => setShowSuccessAlert(false)}
        />
      )}
    </form>
  );
}