import Link from "next/link";
import Bubbles from "@/src/shared/footer/ui/Bubbles";
import JoinForm from "@/src/shared/footer/ui/JoinForm";
import Contacts from "@/src/shared/footer/ui/Contacts";
import links from "@/src/shared/footer/links";

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