import OtherAuthOptions from "@/src/features/auth/OtherAuthOptions";
import LoginForm from "@/src/features/auth/log-in/ui/LoginForm";

export default function LoginPage() {
  return (
    <main className={"max-w-xl mx-auto"}>
      <h1 className={"pt-8 text-center text-2xl font-bold"}>
        Log in
      </h1>

      <LoginForm />

      <OtherAuthOptions registered={true}/>
    </main>
  );
}
