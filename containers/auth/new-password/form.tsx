"use client";

import PasswordInput from "@/components/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordInput, newPasswordSchema } from "@/lib/validators/new-password";
import FormError from "@/components/form-error";
import { changePassword } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

export default function NewPasswordForm({ token }: {
  token: string
}) {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema)
  });

  const submitHandler = async (data: NewPasswordInput) => {
    try {
      await changePassword(token, data.password);
      push("/");
    } catch (e) {
      console.error(e);
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