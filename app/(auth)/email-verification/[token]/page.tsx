import { verifyEmail } from "@/lib/actions/email-confirmaion";
import { notFound } from "next/dist/client/components/not-found";
import { redirect } from "next/navigation";

export default async function EmailVerificationPage({ params }: {
  params?: Promise<{ token: string }>;
}) {
  const pageParams = await params;
  const token = pageParams?.token;
  if (!token) notFound();

  await verifyEmail(token);

  redirect("/email-verification/success");
}