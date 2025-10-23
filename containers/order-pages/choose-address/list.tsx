import { getAddresses } from "@/lib/actions/address";
import AddressCard from "@/containers/order-pages/choose-address/address-card";
import { redirect } from "next/navigation";

export default async function AddressList() {
  const addresses = await getAddresses();
  if(addresses.length < 1) {
    redirect("/new-address");
  }

  const selectHandler = async (addressId: string) => {

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