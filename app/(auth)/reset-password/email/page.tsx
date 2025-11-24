import { MdEmail } from "react-icons/md";

export default async function ResetPasswordEmailPage() {

  return (
    <main className={"w-2/3 mt-10 mx-auto"}>
      <div className={"flex flex-col gap-4 items-center"}>
        <MdEmail className={"text-6xl"} />
        <h1 className={"text-2xl"}>
          Check your email box
        </h1>
        <p className={"text-lg"}>
          The link for changing your password has been sent to your email:
        </p>
        <p>
          The email didn't get to you? Click here to send it again
        </p>
      </div>
    </main>
  );
}