import { ReactNode } from "react";
import { auth } from "@/auth";
import ClientProviders from "@/src/app/providers/client-providers";

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