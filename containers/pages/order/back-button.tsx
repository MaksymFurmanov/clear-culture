"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className={"block bg-dark-blue text-sm text-white cursor-pointer rounded-full py-1 px-6 my-6 ml-6 mr-auto"}
      onClick={() => {
        router.push("/orders");
      }}>
      ← &nbsp; All orders
    </button>
  );
};

export default BackButton;