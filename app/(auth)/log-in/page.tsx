import OtherOptions from "@/components/other-options";
import LogInForm from "@/app/(auth)/log-in/login-form";

export default function LoginPage() {

  return (
    <main className={"max-w-2xl mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>
        Log in
      </h1>

      <LogInForm />

      <OtherOptions type={"signIn"}/>
    </main>
  );
}
