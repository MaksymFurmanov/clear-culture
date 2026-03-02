import OtherAuthOptions from "@/src/features/auth/OtherAuthOptions";
import SignUpForm from "@/src/features/auth/sign-up/ui/SignUpForm";

export default function SignUpPage() {
  return (
    <main className={"max-w-2xl mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>
        Sign up
      </h1>

      <SignUpForm />

      <OtherAuthOptions registered={false}/>
    </main>
  );
}