import Image from "next/image";

export default function AboutTeam() {
  return (
    <section className={"mx-auto md:w-3/5 mb-10 md:mb-16"}>
      <Image className={"w-full mx-auto max-w-120 md:rounded md:border border-gray-300"}
        src={"/img/about-us/activities.webp"}
             alt={""}
             width={400}
             height={400}
      />
      <p className={"text-center mx-4 mt-10 mb-6"}>
        Our passionate team consists of environmentalists, engineers, and creatives who are driven to make a positive
        impact. United by a shared mission, we strive to create products that are not only sustainable but also elevate
        the everyday lives of our customers.
      </p>
    </section>
  );
}