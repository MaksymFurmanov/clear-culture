"use client";

import { useState } from "react";
import { sendEmailConfirmationToken } from "@/src/lib/actions/email-confirmaion";
import { useAlerts } from "@/src/app/providers/alert-provider";

export default function VerifyEmailBtn() {
  const [loading, setLoading] = useState<boolean>(false);
  const { addAlert } = useAlerts();

  const sendHandler = async () => {
    try {
      setLoading(true);
      await sendEmailConfirmationToken();
      addAlert("success", "Verification email has been sent");
    } catch (e) {
      addAlert("warning", "Your email is unverified",
        "Verify your email address before any purchases. " +
        "Click here get the email",
        () => {
          sendHandler();
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={"" +
      "text-base bg-dark-blue rounded-lg text-white cursor-pointer " +
      "py-1 px-4 transition-all duration-100 hover:bg-gray-600 " +
      "disabled:cursor-default disabled:bg-gray-400"}
            onClick={sendHandler}
            disabled={loading}>
      Verify
    </button>
  );
}