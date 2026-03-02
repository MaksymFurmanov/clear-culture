"use client";

import { MdEmail } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import SendAgainBtn from "@/src/features/auth/SendAgainBtn";
import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";

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
        <SendAgainBtn email={email} />

        <ScalingUnderlineBtn href={"/"}>
          Back to the home page
        </ScalingUnderlineBtn>
      </div>
    </main>
  );
}