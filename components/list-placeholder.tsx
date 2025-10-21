import Link from "next/link";

export default function ListPlaceholder({message, buttonName, href}: {
  message: string,
  buttonName: string,
  href: string
}) {
  return (
    <div className={"flex flex-col gap-2 items-center justify-center h-[50dvh]"}>
      <h1 className={"text-xl md:text-2xl text-gray-500"}>
        {message}
      </h1>
      <Link href={href}>
        <button
          className={"block bg-dark-blue text-white md:text-lg cursor-pointer rounded-full py-1 px-12 mt-3 mx-auto mb-8"}
        >
          {buttonName}
        </button>
      </Link>
    </div>
  );
}