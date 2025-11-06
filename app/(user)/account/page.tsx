import InfoFields from "@/containers/user-pages/account/info-fields";
import { getAuthProvider } from "@/lib/actions/user";

export default async function AccountPage() {
  const provider = await getAuthProvider();

  return (
    <main className={"max-w-150 mx-auto"}>
      <h1 className={"text-3xl lg:text-4xl m-10"}>
        Account
      </h1>
      <InfoFields authWith={provider}/>
    </main>
  );
}