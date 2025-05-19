import OtherOptions from "@/components/other-options";
import Form from "@/app/(auth)/sign-up/form";

export default function SignUpPage() {
  return (
    <main className={"max-w-2xl mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>
        Sign up
      </h1>

      <Form />

      <OtherOptions type={"signUp"}/>
    </main>
  );
}