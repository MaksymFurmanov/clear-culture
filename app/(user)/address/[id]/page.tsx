import AddressForm from "@/containers/addresses/form";
import { getAddressById } from "@/lib/actions/address";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import DeleteButton from "@/containers/addresses/delete-button";

export default async function AddressPage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const address = await getAddressById(id);
  if (!address) throw new PageNotFoundError("Address not found");

  return (
    <main className={"w-full mx-auto max-w-150"}>
      <div className={"flex justify-between items-center"}>
        <h1 className={"text-3xl m-8"}>
          Edit address
        </h1>

        <DeleteButton id={id}/>
      </div>

      <AddressForm address={address} />
    </main>
  );
}