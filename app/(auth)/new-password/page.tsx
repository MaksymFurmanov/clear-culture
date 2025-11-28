import NewPasswordForm from "@/containers/auth/new-password/form";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default async function NewPasswordPage({ searchParams }: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) throw new PageNotFoundError("");

  return (
    <div className={"w-2/3 md:w-1/3 mt-[20dvh] mx-auto"}>
      <h1 className={"text-4xl my-10"}>
        New password
      </h1>
      <NewPasswordForm token={token} />
    </div>
  );
}