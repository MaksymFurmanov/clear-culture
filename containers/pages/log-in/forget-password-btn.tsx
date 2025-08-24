import Link from "next/link";

export default function ForgetPasswordBtn() {
  return (
    <Link className={"mt-2 text-right text-sm text-gray-400 cursor-pointer"}
          href={"/reset-password"}>
      Forgot password?
    </Link>
  );
}