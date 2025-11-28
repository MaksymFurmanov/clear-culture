import { MdEmail } from "react-icons/md";
import { getUserEmail } from "@/lib/actions/user";
import ScalingUnderlineLink from "@/components/buttons/scaling-underline-link";
import SendAgainButton from "@/components/emails/send-again-button";

export default async function ChangePasswordEmailPage() {
  const email = await getUserEmail();

  return (
    <main className={"w-2/3 mt-10 mx-auto"}>
      <div className={"flex flex-col gap-4 items-center text-center"}>
        <MdEmail className={"text-6xl"} />
        <h1 className={"text-xl md:text-2xl"}>
          Check your email box
        </h1>
        <p className={"text-base md:text-lg"}>
          The link for changing your password has been sent to your email: {email}
        </p>
        <SendAgainButton email={email} />

        <ScalingUnderlineLink href={"/"}>
          Back to the home page
        </ScalingUnderlineLink>
      </div>
    </main>
  );
}