"use client";

import { useEffect, useState } from "react";
import { isVerified } from "@/lib/actions/email-confirmaion";

const STORAGE_KEY = "email-confirm-alert-dismissed";
const DAY = 24 * 60 * 60 * 1000;

export default function useEmailVerificationAlert(userId: string | null = null): {
  show: boolean,
  closeAction: () => void
} {
  const [show, setShow] = useState(false);

  async function check() {
    if (!userId) return;

    //Check DB
    const verified = await isVerified(userId);
    if (verified) return;

    //Check if asked today
    const last = localStorage.getItem(STORAGE_KEY);
    if (Date.now() - Number(last) < DAY) return;

    setShow(true);
  }

  useEffect(() => {
    check();
  }, []);

  const closeAction = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  return { show, closeAction };
}