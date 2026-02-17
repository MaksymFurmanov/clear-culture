import { FaUser } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IconType } from "react-icons";
import NameForm from "@/containers/user-pages/account/name-form";
import ChangePasswordButton from "@/containers/user-pages/account/change-password-button";
import { auth } from "@/auth";
import VerifyEmailButton from "@/containers/user-pages/account/verify-email-button";
import { isVerified } from "@/lib/actions/email-confirmaion";

export default async function InfoFields({ authWith }: {
  authWith: string
}) {
  const session = await auth();
  const user = session?.user;
  if(!user?.name || !user?.email) throw new Error("Authentication issue");

  const verified = await isVerified(user?.id);

  let Icon: IconType;
  switch (authWith) {
    case "google":
      Icon = FaGoogle;
      break;
    case "github":
      Icon = FaGithub;
      break;
    default:
      Icon = FaUser;
  }

  return (
    <div className={"flex flex-col gap-3 mt-6 mb-12"}>
      <div
        className={"flex gap-5 items-center flex-wrap text-lg md:text-xl mb-4"}>
        <div className={"p-4 rounded-full bg-green"}>
          <Icon className={"w-5 h-5"} />
        </div>
        <p>
          {user.email}
        </p>
        {!verified && <VerifyEmailButton />}
      </div>

      <NameForm defaultValue={user.name} />

      {authWith === "credentials" && <ChangePasswordButton />}
    </div>
  );
}

