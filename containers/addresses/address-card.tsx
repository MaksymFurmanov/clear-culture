import { Address } from "@prisma/client";
import { ReactNode } from "react";

export default function AddressCard({ address, children }: {
  address: Address,
  children?: ReactNode
}) {

  return (
    <div className={"bg-green py-4 px-6 rounded-lg flex flex-wrap gap-4 justify-between items-center"}>
      <div className={"w-1/2"}>
        <div className={"flex flex-wrap gap-1"}>
          <p>{`${address.streetAddress}, ${address.city},`}</p>
          <p className={"mb-2"}>
            {`${address.zipCode}, ${address.country}`}
          </p>
        </div>

        <p className={"mb-2"}>
          {`${address.firstName} ${address.lastName}`}
        </p>

        <p>{address.email}</p>
        <p>{address.phoneNumber}</p>
      </div>
      <div className={"ml-auto mt-1"}>
        {children}
      </div>
    </div>
  );
}