import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientProviders from "@/providers/client-providers";
import { superGetCartItems } from "@/lib/actions/cart-items";

export default async function Providers({ children }: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions);

  const superDbCartItems = session?.user?.id
    ? await superGetCartItems()
    : null;

  return (
    <ClientProviders session={session}
                     superDbCartItems={superDbCartItems}>
      {children}
    </ClientProviders>
  );
}