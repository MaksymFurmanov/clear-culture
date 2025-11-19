import { FaUser } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IconType } from "react-icons";
import NameForm from "@/containers/user-pages/account/name-form";
import ChangePasswordButton from "@/containers/user-pages/account/change-password-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function InfoFields({ authWith }: {
  authWith: string
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.name || !session.user?.email)
    throw new Error("Session connection issue");

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
          {session.user.email}
        </p>
      </div>

      <NameForm defaultValue={session.user.name} />

      {authWith === "credentials" && <ChangePasswordButton />}
    </div>
  );
}

