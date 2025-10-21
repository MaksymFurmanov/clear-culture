"use client";

import Receipt from "@/components/receipt";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/providers/cart-provider";
import { createOrder } from "@/lib/actions/order";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema } from "@/lib/validators/card";
import { z } from "zod";
import { CardBox } from "@/containers/order-pages/payment/card-box";

export type CardFormData = z.infer<typeof cardSchema>;

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
        <CardBox
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