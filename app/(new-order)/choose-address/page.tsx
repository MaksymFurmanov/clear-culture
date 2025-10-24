import AddressList from "@/containers/order-pages/choose-address/list";
import { getAddresses } from "@/lib/actions/address";
import { redirect } from "next/navigation";

export default async function ChooseAddress() {
  const addresses = await getAddresses();
  if(addresses.length < 1) {
    redirect("/new-address");
  }

  return (
    <main>
      <AddressList addresses={addresses}/>
    </main>
  );
}