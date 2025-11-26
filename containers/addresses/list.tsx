"use client";

import AddressCard from "@/containers/addresses/address-card";
import { selectAddress } from "@/lib/actions/cart";
import { Address } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

export default function AddressList({ ordering, addresses }: {
  ordering: boolean,
  addresses: Address[]
}) {
  const { push } = useRouter();

  return (
    <div className={"mx-6 md:mx-auto mt-10 max-w-150"}>
      <div className={"flex flex-col gap-5 max-h-[45dvh] overflow-y-scroll mb-10"}>
        {addresses.map((address, index) => (
          <AddressCard key={index} address={address}>
            <div className={"flex flex-wrap gap-5"}>
              <button onClick={() => push(`/address-book/${address.id}?ordering=${ordering}`)}
                      className={"bg-light-green py-1 px-3 cursor-pointer rounded hover:bg-gray-600 hover:text-white transition-all duration-100"}
              >
                Edit
              </button>

              {ordering && <SelectButton addressId={address.id} />}
            </div>
          </AddressCard>
        ))}
      </div>

      <div
        className={"bg-green rounded-lg mx-auto p-1 w-full cursor-pointer hover:bg-gray-600 hover:text-white transition-all duration-100"}
        onClick={() => push(`/new-address?ordering=${ordering}`)}>
        <CiCirclePlus className={"text-3xl mx-auto"} />
      </div>
    </div>
  );
}

const SelectButton = ({ addressId }: {
  addressId: string
}) => {
  const { push } = useRouter();

  const selectHandler = async (addressId: string) => {
    await selectAddress(addressId);
    push("/payment");
  };

  return (
    <button onClick={() => selectHandler(addressId)}
            className={"bg-dark-blue text-white py-1 px-3 cursor-pointer rounded hover:bg-gray-600 transition-all duration-100"}
    >
      Select
    </button>
  );
};