"use client";

import Receipt from "@/components/receipt";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/providers/cart-provider";
import { createOrder } from "@/lib/actions/order";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema } from "@/lib/validators/card";
import { z } from "zod";
import { CardInputs } from "@/containers/order-pages/payment/card-inputs";
import AddressCard from "@/containers/addresses/address-card";
import { Address } from "@prisma/client";

export type CardFormData = z.infer<typeof cardSchema>;

export default function PaymentForm({ address }: {
  address: Address
}) {
  const { replace, push } = useRouter();
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
      replace("/payment/success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={"mx-6"}
          onSubmit={handleSubmit(onSubmit)}>
      <div className={"mb-8"}>
        <h2 className={"text-2xl mb-5"}>Card details</h2>
        <CardInputs
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      </div>

      <div className={"mb-6"}>
        <AddressCard address={address}>
          <div className={"flex flex-wrap gap-5"}>
            <button type={"button"}
                    className={"bg-light-green py-1 px-3 cursor-pointer rounded hover:bg-gray-600 hover:text-white transition-all duration-100"}
                    onClick={() => push(`/address/${address.id}`)}>
              Edit
            </button>

            <button type={"button"}
                    className={"bg-dark-blue text-white py-1 px-3 cursor-pointer rounded hover:bg-gray-600 transition-all duration-100"}
                    onClick={() => push("/choose-address")}>
              Change
            </button>
          </div>
        </AddressCard>
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
        className={"block bg-dark-blue text-white text-lg rounded-full " +
          "cursor-pointer px-10 py-1 mr-6 ml-auto mb-6"}
      >
        {isSubmitting ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}