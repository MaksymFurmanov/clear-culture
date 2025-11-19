import Link from "next/link";

export default function ChangePasswordButton() {
  return (
    <Link
      className={"bg-light-green cursor-pointer rounded-lg w-fit " +
        "py-1 px-4 transition-all duration-100 hover:bg-gray-600 hover:text-white"}
      href={"/change-password"}
    >
      Change password
    </Link>
  );
};