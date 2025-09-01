import Image from "next/image";

export default function DopeProblemArticle() {
  return (
    <article>
      <h2 className={"text-2xl text-center mb-6 max-w-50 mx-auto md:max-w-auto"}>
        Rethink Paper,
        Reduce Waste
      </h2>
      <Image className={"w-full mb-8 md:rounded"}
             src={"/img/reusable-notebook/dump.jpg"}
             alt={"reusable-reusable-notebook"}
             width={1024}
             height={586}
      />
      <p className={"text-center my-6 mx-[min(1em,5%)]"}>
        Paper production contributes to deforestation, excessive water use, and pollution, with billions of trees cut down annually. The manufacturing process consumes vast resources and releases harmful chemicals into the environment. Most paper products end up in landfills, adding to waste and emissions. By choosing reusable notebooks, you help reduce waste, protect forests, and minimize your environmental footprint.
      </p>
    </article>
  );
}