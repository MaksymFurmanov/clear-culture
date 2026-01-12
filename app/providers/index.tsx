import { ReactNode } from "react";
import ClientProviders from "@/app/providers/client-providers";
import { auth } from "@/auth";

export default async function Providers({ children }: {
  children: ReactNode
}) {
  const session = await auth();

  return (
    <ClientProviders session={session}>
      {children}
    </ClientProviders>
  );
}