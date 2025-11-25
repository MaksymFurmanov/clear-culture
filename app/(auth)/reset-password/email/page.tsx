"use client";

import { MdEmail } from "react-icons/md";
import { changePasswordWithEmail } from "@/lib/actions/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordEmailPage() {
  const [disable, setDisable] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const email = searchParams.get("email");
  if (!email) {
    push("/reset-password");
    throw new Error("Email required");
  }

  const sendAgainHandler = async () => {
    setDisable(true);
    await changePasswordWithEmail(email);
    setTimeout(() => setDisable(false), 120000);
  };

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
        {!disable && (
          <p>
            The email didn't get to you? <button className={"cursor-pointer"}
                                                 onClick={sendAgainHandler}
                                                 disabled={disable}>
            Click here to send it again
          </button>
          </p>
        )}
      </div>
    </main>
  );
}