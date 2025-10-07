import Link from "next/link";

const BackButton = () => {
  return (
    <Link href="/orders">
      <button
        className={"block bg-dark-blue text-sm text-white cursor-pointer rounded-full py-1 px-6 my-6 ml-6 mr-auto"}
      >
        ← &nbsp; All orders
      </button>
    </Link>
  );
};

export default BackButton;