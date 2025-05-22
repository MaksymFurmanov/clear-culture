import Image from "next/image";

export default function Article() {
  return (
    <section className={"text-base md:text-lg lg:text-2xl"}>
      <div className={"flex justify-evenly items-center w-full max-w-250 mx-auto mb-18 2xl:justify-between"}>
        <p className={"max-w-90 md:w-2/5 mx-4"}>
          Clear culture’s reusable eye masks offer a self-care experience with hypoallergenic materials, making them
          gentle.
        </p>
        <Image className={"w-1/5"}
               src={"/img/eye-masks/eye-masks.png"}
               alt={""}
               width={300}
               height={300}
        />
      </div>

      <div className={"w-full md:w-3/5 mb-12 mx-auto"}>
        <Image className={"w-full md:rounded"}
               src={"/img/eye-masks/eye-masks-2.jpg"}
               alt={""}
               width={600}
               height={350}
        />
      </div>

      <div className={"flex justify-evenly items-center w-full max-w-250 mx-auto mb-12 2xl:justify-between"}>
        <Image className={"w-1/5"}
               src={"/img/eye-masks/silicone-pads.jpg"}
               alt={""}
               width={300}
               height={300}
        />
        <p className={"max-w-90 md:w-2/5 mx-4"}>
          These cruelty-free masks are perfect for reducing fine lines, hydrating tired eyes, and can be reused up to
          100 times.
        </p>
      </div>
    </section>
  );
}