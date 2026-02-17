"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData, userSchema } from "@/lib/validators/user";
import { changeUserInfo } from "@/lib/actions/user";
import { useAlerts } from "@/app/providers/alert-provider";

export default function NameForm({ defaultValue }: {
  defaultValue: string
}) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: defaultValue }
  });

  const { addAlert } = useAlerts();

  const nameValue = watch("name");
  const isChanged = nameValue.trim() !== defaultValue;

  const onSubmit = async (data: UserFormData) => {
    try {
      await changeUserInfo(data);
      addAlert(
        "success",
        "Name changed successfully",
        `Your new username is ${data.name}`
      );
    } catch (e: any) {
      setError("name", e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex gap-2 flex-wrap items-center text-lg md:text-xl mb-2"}>
        <label>
          Name:
        </label>
        <input className={"w-36 mr-3"}
               defaultValue={defaultValue}
               size={30}
               {...register("name")}
        />

        <button type={"submit"}
                className={"text-base bg-dark-blue rounded-lg text-white cursor-pointer " +
                  "py-1 px-4 transition-all duration-100 hover:bg-gray-600 " +
                  "disabled:cursor-default disabled:bg-gray-400"}
                disabled={!isChanged || isSubmitting}
        >
          Save
        </button>
      </div>

      {errors.name?.message && (
        <p className={"text-red-500"}>
          {errors.name.message}
        </p>
      )}
    </form>
  );
}