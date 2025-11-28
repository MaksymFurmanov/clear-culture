"use client";

import { MdEmail } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";
import SendAgainButton from "@/components/emails/send-again-button";

export default function ResetPasswordEmailPage() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const email = searchParams.get("email");
  if (!email) {
    push("/reset-password");
    throw new Error("Email required");
  }

  return (
    <main className={"w-2/3 mt-[20dvh] mx-auto"}>
      <div className={"flex flex-col gap-4 items-center"}>
        <MdEmail className={"text-6xl"} />
        <h1 className={"text-2xl"}>
          Check your email box
        </h1>
        <p className={"text-lg text-center"}>
          The link for changing your password has been sent to your email: {email}
        </p>
        <SendAgainButton email={email} />

        <ScalingUnderlineLink href={"/"}>
          Back to the home page
        </ScalingUnderlineLink>
      </div>
    </main>
  );
}