"use client";

import { IoClose } from "react-icons/io5";
import useEmailVerificationAlert from "@/hooks/alerts/email-confirmation";
import { useAlerts } from "@/app/providers/alert-provider";
import { sendEmailConfirmationToken } from "@/lib/actions/email-confirmaion";
import { useSession } from "next-auth/react";

export default function EmailVerificationAlert() {
  const { data: user } = useSession();
  const { addAlert } = useAlerts();
  const { show, closeAction } = useEmailVerificationAlert(user?.user?.id);

  const sendHandler = async () => {
    try {
      await sendEmailConfirmationToken();
      addAlert("success", "Verification email has been sent");
      closeAction();
    } catch (e) {
      addAlert("warning", "Your email is unverified",
        "Verify your email address before any purchases. " +
        "Click here get the email",
        () => {
          sendHandler();
        });
    }
  }

  return show ? (
    <div className={"flex cursor-pointer py-2 px-4 md:px-6 bg-gray-600 " +
      "items-center justify-between gap-5 hover:bg-gray-700"}
         onClick={sendHandler}>
      <div/>
      <p className={"text-lg text-white"}>
        Your email is not verified. Click here to get verification email
      </p>
      <button className={"cursor-pointer rounded " +
        "bg-gray-800 hover:bg-gray-900"}
              onClick={closeAction}>
        <IoClose className={"w-5 h-5 fill-white"}/>
      </button>
    </div>
  ) : (
    <></>
  );
}