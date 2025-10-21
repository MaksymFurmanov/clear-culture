import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ChangeEvent } from "react";
import FormError from "@/components/form-error";
import { CardFormData } from "@/containers/order-pages/payment/card-form";

export const CardBox = ({ register, errors, watch, setValue }: {
  register: UseFormRegister<CardFormData>;
  errors: FieldErrors<CardFormData>;
  watch: UseFormWatch<CardFormData>;
  setValue: UseFormSetValue<CardFormData>;
}) => {
  const errorColor = "#ffc7c7";

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setValue("number", formatted);
  };

  const handleValidChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{1,2})$/, "$1/$2");
    }
    setValue("valid", value);
  };

  return (
    <div className={"bg-[linear-gradient(270deg,_rgba(42,44,53,0.95)_0%,_#7B819B_100%)] max-w-100 rounded-xl p-6 mx-4"}>
      <div className={"mb-3"}>
        <input
          {...register("number")}
          value={watch("number") || ""}
          onChange={handleCardNumberChange}
          className={"block bg-white text-center rounded-md px-2 py-1 w-full"}
          placeholder={"Card number"}
          inputMode={"numeric"}
        />
        {errors.number && (
          <FormError color={errorColor}>{errors.number.message}</FormError>
        )}
      </div>

      <div className={"mb-3 flex items-center gap-3"}>
        <div>
          <input
            {...register("valid")}
            value={watch("valid") || ""}
            onChange={handleValidChange}
            className={"block bg-white text-center rounded-md px-2 py-1 w-24"}
            placeholder={"MM/YY"}
            inputMode={"numeric"}
          />
          {errors.valid && (
            <FormError color={errorColor}>{errors.valid.message}</FormError>
          )}
        </div>

        <div className={"ml-auto"}>
          <input
            {...register("SVV")}
            className={"block bg-white text-center rounded-md px-2 py-1 w-16"}
            placeholder={"CVV"}
            inputMode={"numeric"}
            maxLength={4}
          />
          {errors.SVV && (
            <FormError color={errorColor}>{errors.SVV.message}</FormError>
          )}
        </div>
      </div>

      <div className={"mb-3"}>
        <input
          {...register("name")}
          className={"block bg-white text-center rounded-md px-2 py-1 w-4/5"}
          placeholder={"Cardholder name"}
        />
        {errors.name && (
          <FormError color={errorColor}>{errors.name.message}</FormError>
        )}
      </div>
    </div>
  );
};