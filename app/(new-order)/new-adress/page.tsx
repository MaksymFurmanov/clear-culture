import Form from "@/app/(new-order)/new-adress/form";

export default function NewAdressPage() {
  return (
    <main className={"w-full mx-auto max-w-150"}>
      <h1 className={"text-3xl m-8"}>
        Add adress
      </h1>
      <Form />
    </main>
  );
}