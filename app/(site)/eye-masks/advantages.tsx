import Image from "next/image";

export default function Advantages() {
  return (
    <section className={"flex justify-evenly items-center mb-12"}>
      <div className={"flex flex-col items-center w-1/5 md:w-1/8 h-full"}>
        <Image src={"/img/eye-masks/people.png"}
               alt={""}
               width={150}
               height={150}
        />
        <p className={"text-nowrap"}>
          For all skin types
        </p>
      </div>

      <div className={"flex flex-col items-center w-1/5 md:w-1/8 h-full"}>
        <Image src={"/img/eye-masks/water.png"}
               alt={""}
               width={150}
               height={150}
        />
        <p>
          Hydration
        </p>
      </div>

      <div className={"flex flex-col items-center w-1/5 md:w-1/8 h-full"}>
        <Image src={"/img/eye-masks/leaf.png"}
               alt={""}
               width={150}
               height={150}
        />
        <p>
          Eco-friendly
        </p>
      </div>
    </section>
  );
}