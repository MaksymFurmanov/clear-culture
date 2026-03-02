import { MdEmail } from "react-icons/md";
import { getUserEmail } from "@/src/lib/actions/user";
import SendAgainBtn from "@/src/features/auth/SendAgainBtn";
import ScalingUnderlineBtn from "@/src/shared/buttons/ScalingUnderlineBtn";

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
        <SendAgainBtn email={email} />

        <ScalingUnderlineBtn href={"/"}>
          Back to the home page
        </ScalingUnderlineBtn>
      </div>
    </main>
  );
}