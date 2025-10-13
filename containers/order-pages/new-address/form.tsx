"use client";

import { useRouter } from "next/navigation";
import { countries } from "@/containers/order-pages/new-address/countryLocaleMap";
import FormElement from "@/containers/order-pages/new-address/form-element";
import { useForm } from "react-hook-form";
import { AddressInput, addressSchema } from "@/lib/validators/address";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/form-error";
import { OrbitProgress } from "react-loading-indicators";
import { createAddress } from "@/lib/actions/address";
import { useSession } from "next-auth/react";

export default function Form() {
  const { replace } = useRouter();
  const { data: user } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema)
  });

  const onSubmit = async (data: AddressInput) => {
    await createAddress(data);
    replace("/payment");
  };

  return (
    <form className={"flex flex-col gap-4 lg:gap-6 text-base lg:text-lg px-4"}
          onSubmit={handleSubmit(onSubmit)}>
      <FormElement label={"First name"} {...register("firstName")} />
      {errors.firstName && <FormError>{errors.firstName.message}</FormError>}
      <FormElement label={"Last name"} {...register("lastName")} />
      {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
      <FormElement label={"Email"}
                   {...register("email")}
                   defaultValue={user?.user?.email || ""}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <FormElement label={"Phone number"} {...register("phoneNumber")} />
      {errors.phoneNumber && <FormError>{errors.phoneNumber.message}</FormError>}

      <div className={"h-2"} />

      <div>
        <label className={"block mb-2 ml-2"}>
          Country
        </label>
        <select className={"block bg-light-green rounded-lg border border-gray-300 w-full py-2 px-4"}
                {...register("country")}
        >
          {countries.map((country, index) => {
            return (
              <option key={index}>
                {country}
              </option>
            );
          })}
        </select>
      </div>
      {errors.country && <FormError>{errors.country.message}</FormError>}

      <FormElement label={"City/Town"} {...register("city")} />
      {errors.city && <FormError>{errors.city.message}</FormError>}
      <FormElement label={"Street address"} {...register("streetAddress")} />
      {errors.streetAddress && <FormError>{errors.streetAddress.message}</FormError>}
      <FormElement label={"ZIP code/Postal code"} {...register("zipCode")} placeholder={"Code"} />
      {errors.zipCode && <FormError>{errors.zipCode.message}</FormError>}

      <div className={"h-2"} />

      <button
        className={"block bg-dark-blue text-white cursor-pointer rounded-full py-1 px-12 mx-auto mb-8"}
        type={"submit"}
        disabled={isSubmitting}
      >
        {!isSubmitting ? "Confirm" : (
          <OrbitProgress style={{ fontSize: "4px", marginTop: "1em" }}
                         variant="disc"
                         dense
                         color="#ffffff"
                         size="small"
          />
        )}
      </button>
    </form>
  );
}