import OtherAuthOptions from "@/components/other-auth-options";
import LogInForm from "@/containers/auth-pages/log-in/form";

export default function LoginPage() {
  return (
    <main className={"max-w-xl mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>
        Log in
      </h1>

      <LogInForm />

      <OtherAuthOptions registered={true}/>
    </main>
  );
}
