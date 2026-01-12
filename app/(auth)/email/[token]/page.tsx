import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default async function EmailConfirmationPage({ params }: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params;
  if(!token) throw new PageNotFoundError("");

  //await confirmEmail(token);

  return (
    <main>
      <h1>Email confirmed</h1>
      <ScalingUnderlineLink href={"/"}>
        Back to the main page
      </ScalingUnderlineLink>
    </main>
  );
}