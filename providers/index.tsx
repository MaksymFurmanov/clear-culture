import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientProviders from "@/providers/client-providers";
import getCartItems from "@/lib/actions/cart-items";

export default async function Providers({ children }: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions);

  const dbCartItems = session?.user?.id
    ? await getCartItems(session.user.id)
    : undefined;

  return (
    <ClientProviders session={session}
                     dbCartItems={dbCartItems}>
      {children}
    </ClientProviders>
  );
}