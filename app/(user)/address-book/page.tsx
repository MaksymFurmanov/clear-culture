import AddressList from "@/containers/addresses/list";
import { getAddresses } from "@/lib/actions/address";

export default async function AddressBookPage() {
  const addresses = await getAddresses();

  return (
    <main className={"w-full mx-auto max-w-150"}>
      <h1 className={"text-3xl m-8"}>
        Address book
      </h1>

      <AddressList ordering={false}
                   addresses={addresses}
      />
    </main>
  );
}