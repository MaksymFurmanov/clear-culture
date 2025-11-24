import { MdEmail } from "react-icons/md";
import { getUserEmail } from "@/lib/actions/user";

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
        <p className={"text-sm md:text-base"}>
          The email didn't get to you? Click here to send it again
        </p>
      </div>
    </main>
  );
}