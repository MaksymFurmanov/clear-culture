import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";

export default async function EmailVerificationSuccess() {
  return (
    <main>
      <h1 className={"text-2xl"}>
        Your email has been successfully verified.
      </h1>
      <ScalingUnderlineLink href={"/"}>
        Back to the main page
      </ScalingUnderlineLink>
    </main>
  );
}