import AddressForm from "@/src/features/user/address/ui/AddressForm";

export default function NewAddressPage() {
  return (
    <main className={"w-full mx-auto max-w-150"}>
      <h1 className={"text-3xl m-8"}>
        Add address
      </h1>
      <AddressForm />
    </main>
  );
}