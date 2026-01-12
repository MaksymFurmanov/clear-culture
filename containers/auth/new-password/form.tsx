"use client";

import PasswordInput from "@/components/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordInput, newPasswordSchema } from "@/lib/validators/new-password";
import FormError from "@/components/form-error";
import { useRouter } from "next/navigation";
import { useAlerts } from "@/app/providers/alert-provider";
import { changePassword } from "@/lib/actions/change-password";

export default function NewPasswordForm({ token }: {
  token: string
}) {
  const { push } = useRouter();
  const { addAlert } = useAlerts();

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

      addAlert("success", "Password changed successfully");

      push("/");
    } catch (e) {
      if (e instanceof Error) {
        addAlert("error", "The link is invalid or expired");
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
    </form>
  );
}