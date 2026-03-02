import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "@/src/lib/actions/user";
import BurgerMenu from "@/src/shared/header/ui/BurgerMenu";

export default async function Header() {
  const isAuth = await isAuthenticated();

  return (
    <header className={"relative bg-light-green grid grid-cols-3 " +
      "items-center justify-items-stretch z-30 " +
      "max-h-20 py-2 px-4 lg:py-4 lg:px-6"}>
      <div className={"col-start-2 flex justify-center"}>
        <Link href="/">
          <Image className={"w-20 lg:w-24"}
                 src={"/img/logo/logo-no-background.svg"}
                 alt={"Logo"}
                 loading={"eager"}
                 width={100}
                 height={100}
          />
        </Link>
      </div>

      <BurgerMenu isAuth={isAuth} />
    </header>
  );
}