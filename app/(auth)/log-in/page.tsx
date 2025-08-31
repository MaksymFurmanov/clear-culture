import OtherLogInOptions from "@/components/other-log-in-options";
import LogInForm from "@/containers/pages/log-in/login-form";

export default function LoginPage() {
  return (
    <main className={"max-w-xl mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>
        Log in
      </h1>

      <LogInForm />

      <OtherLogInOptions type={"signIn"}/>
    </main>
  );
}
