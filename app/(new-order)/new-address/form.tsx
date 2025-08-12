'use client';

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import countries from "@/data/countries";

export default function Form() {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    /*const response = await fetch('/api/add-adress', {
      method: 'POST',
      body: formData,
    });*/

    console.log(formData);
    router.replace("/payment");
  };

  return (
    <form className={"flex flex-col gap-4 lg:gap-6 text-base lg:text-lg px-4"}
          onSubmit={(e) => onSubmit(e)}>
      <FormElement label={"First name"} name={"name"} />
      <FormElement label={"Last name"} name={"surname"} />
      <FormElement label={"Email"} name={"email"} />
      <FormElement label={"Phone number"} name={"phone_number"} />

      <div className={"h-2"} />

      <div>
        <label className={"block mb-2 ml-2"}>
          Country
        </label>
        <select className={"block bg-light-green rounded-lg border border-gray-300 w-full py-2 px-4"}
                name={"country"}
        >
          {countries.map((country,
                          index) => {
            return (
              <option key={index}>
                {country}
              </option>
            );
          })}
        </select>
      </div>

      <FormElement label={"City/Town"} name={"city"} />
      <FormElement label={"Street adress"} name={"adress"} />
      <FormElement label={"ZIP code/Postal code"} name={"postal_code"} placeholder={"Code"} />

      <div className={"h-2"} />

      <button
        className={"block bg-dark-blue text-white cursor-pointer rounded-full py-1 px-12 mx-auto mb-8"}
        type={"submit"}
      >
        Confirm
      </button>
    </form>
  );
}

const FormElement = ({ label, name, placeholder }: {
  label: string,
  name: string,
  placeholder?: string
}) => {
  return (
    <div>
      <label className={"block mb-2 ml-2"}
             htmlFor={name}
      >
        {label}
      </label>
      <input className={"block bg-light-green rounded-lg border border-gray-300 w-full py-2 px-4"}
             placeholder={placeholder || label}
             name={name}
      />
    </div>
  );
};