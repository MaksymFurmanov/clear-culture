"use client";

import Receipt from "@/components/receipt";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/providers/cart-provider";
import { createOrder } from "@/lib/actions/order";
import { useForm, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema } from "@/lib/validators/card";
import FormError from "@/components/form-error";
import { ChangeEvent } from "react";
import { z } from "zod";

type CardFormData = z.infer<typeof cardSchema>;

export default function CardForm() {
  const router = useRouter();
  const { totalPrice, loadingTotal } = useCart();
  const delivery = "3.5";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema)
  });

  const onSubmit = async () => {
    try {
      await createOrder();
      router.replace("/payment-success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"mb-8"}>
        <h2 className={"text-2xl ml-4 mb-5"}>Card details</h2>
        <Card
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      </div>

      {loadingTotal ? (
        <p>Loading...</p>
      ) : (
        <Receipt
          price={totalPrice}
          delivery={delivery}
          total={totalPrice}
        />
      )}

      <button
        type={"submit"}
        disabled={isSubmitting}
        className={"block bg-dark-blue text-white text-lg rounded-full cursor-pointer px-10 py-1 mr-6 ml-auto mb-6"}
      >
        {isSubmitting ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}

const Card = ({ register, errors, watch, setValue }: {
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