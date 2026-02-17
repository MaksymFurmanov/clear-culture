"use client";

export default async function EmailVerificationError() {
  return (
    <main>
      <h1 className={"text-2xl"}>
        The token is invalid or expired.
      </h1>
    </main>
  );
}