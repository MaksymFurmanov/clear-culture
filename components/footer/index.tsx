import Link from "next/link";
import JoinForm from "@/components/footer/join-form";
import Contacts from "@/components/footer/contacts";
import Bubbles from "./bubbles";
import { TextLink } from "@/types";

const links: TextLink[] = [
  {
    label: "About us",
    href: "/about-us"
  },
  {
    label: "Terms of service",
    href: ""
  },
  {
    label: "Privacy policy",
    href: ""
  },
  {
    label: "Shipping",
    href: ""
  }
];

export default function Footer() {
  return (
    <footer className={"relative overflow-hidden bottom-0"}>
      <Bubbles />

      <div className={"mx-auto px-6 max-w-200"}>
        <JoinForm />
        <Contacts />
      </div>

      <div className={"w-3/4 max-w-150 mx-auto text-gray-500"}>
        <div className={"flex justify-around mt-6 mb-4"}>
          {links.map((link, index) =>
            <Link key={index}
                  href={link.href}
            >
              {link.label}
            </Link>
          )}
        </div>

        <p className={"text-center mb-4"}>
          © Maksym Furmanov, non-commercial personal project
        </p>
      </div>
    </footer>
  );
}