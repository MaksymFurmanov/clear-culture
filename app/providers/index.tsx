import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientProviders from "@/app/providers/client-providers";

export default async function Providers({ children }: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <ClientProviders session={session}>
      {children}
    </ClientProviders>
  );
}