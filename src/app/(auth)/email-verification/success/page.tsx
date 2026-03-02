import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";

export default async function EmailVerificationSuccess() {
  return (
    <main>
      <h1 className={"text-2xl"}>
        Your email has been successfully verified.
      </h1>
      <ScalingUnderlineBtn href={"/"}>
        Back to the main page
      </ScalingUnderlineBtn>
    </main>
  );
}