"use client";

import { useState } from "react";
import { changePasswordWithEmail } from "@/lib/actions/change-password";

export default function SendAgainButton({email}: {email: string}) {
  const [disable, setDisable] = useState<boolean>(false);

  const sendAgainHandler = async () => {
    setDisable(true);
    await changePasswordWithEmail(email);
    setTimeout(() => setDisable(false), 120000);
  };

  return !disable && (
    <p>
      The email didn't get to you? <button className={"cursor-pointer"}
                                           onClick={sendAgainHandler}
                                           disabled={disable}>
      Click here to send it again
    </button>
    </p>
  );
}