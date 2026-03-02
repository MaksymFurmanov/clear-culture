import { notFound } from "next/dist/client/components/not-found";
import { redirect } from "next/navigation";
import { verifyEmail } from "@/src/lib/actions/email-confirmaion";

export default async function EmailVerificationPage({ params }: {
  params?: Promise<{ token: string }>;
}) {
  const pageParams = await params;
  const token = pageParams?.token;
  if (!token) notFound();

  await verifyEmail(token);

  redirect("/email-verification/success");
}