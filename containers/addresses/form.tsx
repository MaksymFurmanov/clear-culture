"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { countries } from "@/containers/addresses/countryLocaleMap";
import FormElement from "@/containers/addresses/form-element";
import { useForm } from "react-hook-form";
import { AddressInput, addressSchema } from "@/lib/validators/address";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/form-error";
import { OrbitProgress } from "react-loading-indicators";
import { updateAddress, createAddress } from "@/lib/actions/address";
import { useSession } from "next-auth/react";
import { Address } from "@prisma/client";
import { selectAddress } from "@/lib/actions/cart";

export default function AddressForm({ address }: {
  address?: Address
}) {
  const searchParams = useSearchParams();
  const ordering = searchParams.get("ordering") === "true";

  const edited = !!address;
  const { replace, back } = useRouter();
  const { data: user } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema)
  });

  const onSubmit = async (data: AddressInput) => {
    try {
      let selectedAddressId = address?.id;

      if (edited) {
        await updateAddress(address.id, data);
      } else {
        const address = await createAddress(data);
        selectedAddressId = address.id;
      }

      if (ordering && selectedAddressId) {
        await selectAddress(selectedAddressId);
        replace("/payment");
      } else back();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={"flex flex-col gap-4 lg:gap-6 text-base lg:text-lg px-4 mb-4"}
          onSubmit={handleSubmit(onSubmit)}>
      <FormElement label={"First name"}
                   {...register("firstName")}
                   defaultValue={address?.firstName || ""}
      />
      {errors.firstName && <FormError>{errors.firstName.message}</FormError>}
      <FormElement label={"Last name"}
                   {...register("lastName")}
                   defaultValue={address?.lastName || ""}
      />
      {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
      <FormElement label={"Email"}
                   {...register("email")}
                   defaultValue={user?.user?.email || ""}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <FormElement label={"Phone number"}
                   {...register("phoneNumber")}
                   defaultValue={address?.phoneNumber || ""}
      />
      {errors.phoneNumber && <FormError>{errors.phoneNumber.message}</FormError>}

      <div className={"h-2"} />

      <div>
        <label className={"block mb-2 ml-2"}>
          Country
        </label>
        <select className={"block bg-light-green rounded-lg border border-gray-300 w-full py-2 px-4"}
                {...register("country")}
                defaultValue={address?.country || "Slovakia"}
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

      <FormElement label={"City/Town"}
                   {...register("city")}
                   defaultValue={address?.city || ""}
      />
      {errors.city && <FormError>{errors.city.message}</FormError>}
      <FormElement label={"Street address"}
                   {...register("streetAddress")}
                   defaultValue={address?.streetAddress || ""}
      />
      {errors.streetAddress && <FormError>{errors.streetAddress.message}</FormError>}
      <FormElement label={"ZIP code/Postal code"}
                   {...register("zipCode")}
                   placeholder={"Code"}
                   defaultValue={address?.zipCode || ""}
      />
      {errors.zipCode && <FormError>{errors.zipCode.message}</FormError>}

      <div className={"h-2"} />

      <SubmitButton edited={edited}
                    isSubmitting={isSubmitting}
      />
    </form>
  );
}

const SubmitButton = ({ edited, isSubmitting }: {
  edited: boolean,
  isSubmitting: boolean
}) => {
  const label = edited ? "Save" : "Confirm";

  return (
    <button
      className={"block bg-dark-blue text-white cursor-pointer rounded-full py-1 px-12 mx-auto"}
      type={"submit"}
      disabled={isSubmitting}
    >
      {!isSubmitting ? label : (
        <OrbitProgress style={{ fontSize: "4px", marginTop: "1em" }}
                       variant="disc"
                       dense
                       color="#ffffff"
                       size="small"
        />
      )}
    </button>
  );
};