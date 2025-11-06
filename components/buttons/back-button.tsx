import Link from "next/link";
import { ReactNode } from "react";

const BackButton = ({children, href}: {
  children: ReactNode,
  href: string
}) => {
  return (
    <Link href={href}>
      <button
        className={"block bg-dark-blue text-sm text-white cursor-pointer rounded-full py-1 px-6 my-6 ml-6 mr-auto"}
      >
        ← &nbsp; {children}
      </button>
    </Link>
  );
};

export default BackButton;