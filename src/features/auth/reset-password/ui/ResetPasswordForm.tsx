"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FormError from "@/src/shared/FormError";
import { isEmailExists } from "@/src/lib/actions/user";
import { EmailFormInput, emailSchema } from "@/src/features/auth/reset-password/reset-password.schema";
import { changePasswordWithEmail } from "@/src/lib/actions/change-password";

export default function ResetPasswordForm() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<EmailFormInput>({
    resolver: zodResolver(emailSchema)
  });

  const submitHandler = async (data: EmailFormInput) => {
    const exists = await isEmailExists(data.email);

    if (!exists) {
      setError("email", { message: "Account with this email not found" });
      return;
    }

    try {
      await changePasswordWithEmail(data.email);
      push(`/reset-password/email?email=${data.email}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={"flex flex-col w-2/3 mt-4 mx-auto"}
          onSubmit={handleSubmit(submitHandler)}>
      <label className="block">
        Your email address:
      </label>
      <input className={"mt-2 px-4 py-3 bg-gray-200 rounded-xl"}
             placeholder={"Email"}
             {...register("email")}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}

      <button className={"block mt-6 px-10 py-3 bg-black text-white " +
        "rounded-full cursor-pointer"}
              disabled={isSubmitting}
      >
        Recover Password
      </button>
    </form>
  );
}