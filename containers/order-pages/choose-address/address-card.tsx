import { Address } from "@prisma/client";
import { ReactNode } from "react";

export default function AddressCard({ address, children }: {
  address: Address,
  children?: ReactNode
}) {
  return (
    <div className={"bg-green m-6 p-4 rounded-lg flex justify-between items-start"}>
      <div>
        <p>{`${address.firstName} ${address.lastName}`}</p>
        <p>{`${address.streetAddress}, ${address.zipCode}`}</p>
        <p>{`${address.city}, ${address.country}`}</p>
        <p>{address.email}</p>
        <p>{address.phoneNumber}</p>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}