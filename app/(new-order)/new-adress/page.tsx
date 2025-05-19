import Form from "@/app/(new-order)/new-adress/form";

export default function NewAdressPage() {
  return (
    <main className={"w-full mx-auto md:w-3/5 lg:w-3/7"}>
      <h1 className={"text-3xl m-8"}>
        Add adress
      </h1>
      <Form />
    </main>
  );
}