import OtherOptions from "@/app/ui/other-options";
import SignUpForm from "@/app/ui/sign-up/sign-up-form";

export default function SignUp() {
  return (
    <main className={"max-w-2xl mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>
        Sign up
      </h1>

      <SignUpForm />

      <OtherOptions type={"signUp"}/>
    </main>
  );
}