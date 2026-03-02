import { redirect } from "next/navigation";
import AddressList from "@/src/features/user/address/ui/List";
import { getAddresses } from "@/src/lib/actions/address";

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