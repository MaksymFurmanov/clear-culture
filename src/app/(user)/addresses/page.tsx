import { getAddresses } from "@/src/lib/actions/address";
import AddressList from "@/src/features/user/address/ui/List";

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