import AddressList from "@/containers/addresses/list";
import { getAddresses } from "@/lib/actions/address";
import { redirect } from "next/navigation";

export default async function ChooseAddress() {
  const addresses = await getAddresses();
  if (addresses.length < 1) {
    redirect("/new-address");
  }

  return (
    <main className={"mx-auto max-w-140"}>
      <h1 className={"text-3xl m-8"}>
        Delivery address
      </h1>

      <AddressList ordering={true}
                   addresses={addresses}
      />
    </main>
  );
}