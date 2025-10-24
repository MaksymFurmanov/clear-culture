"use client";

import AddressCard from "@/containers/order-pages/choose-address/address-card";
import { selectAddress } from "@/lib/actions/cart";
import { Address } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function AddressList({addresses}: {
  addresses: Address[]
}) {
  const {push} = useRouter();

  const selectHandler = async (addressId: string) => {
    await selectAddress(addressId);
    push("/payment");
  }

  return (
    <div>
      {addresses.map((address, index) => (
        <AddressCard key={index} address={address}>
          <button onClick={() => selectHandler(address.id)}>
            Select
          </button>
        </AddressCard>
      ))}
    </div>
  );
}