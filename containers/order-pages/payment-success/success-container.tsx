import CheckIcon from "@/public/img/check.svg";
import Link from "next/link";

export default function SuccessContainer() {
  return (
    <div className={"w-full h-[85dvh] md:text-base flex justify-center items-center"}>
      <div
        className={"bg-light-green max-w-100 w-full flex flex-col justify-center rounded-lg p-8 pt-12 mx-8"}>
        <CheckIcon className={"mb-6 mx-auto fill-dark-blue stroke-white"} />
        <h1 className={"text-xl md:text-2xl text-center mb-12"}>
          Payment successful
        </h1>
        <Link href={"/orders"} className={"mx-auto"}>
          <button className={"bg-dark-blue rounded-full cursor-pointer text-white w-40 py-1 mb-5"}>
            My orders
          </button>
        </Link>
        <Link href={"/catalog/1"} className={"mx-auto"}>
          <button className={"bg-dark-blue rounded-full cursor-pointer text-white w-40 py-1 mb-3"}>
            Back to catalog
          </button>
        </Link>
      </div>
    </div>
  );
}