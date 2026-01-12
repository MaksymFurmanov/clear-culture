"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { changePasswordWithEmail } from "@/lib/actions/change-password";

export default function WithoutPrevPasswordBtn() {
  const { data } = useSession();
  const email = data?.user?.email;
  if (!email) throw new Error("Authorization error");

  const { push } = useRouter();

  const emailHandler = async () => {
    try {
      await changePasswordWithEmail(email);
      push("/account/change-password/email");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <p className={"mt-2 text-gray-500 cursor-pointer"}
       onClick={emailHandler}>
      Don't remember the password
    </p>
  );
};