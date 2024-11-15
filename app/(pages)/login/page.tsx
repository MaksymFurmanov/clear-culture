import OtherOptions from "@/app/ui/other-options";
import LogInForm from "@/app/ui/login/login-form";

export default function Login() {

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
