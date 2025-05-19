import Image from "next/image";

export default function DopeProblemArticle() {
  return (
    <article>
      <h2 className={"text-2xl text-center mb-8"}>
        Rethink Paper, <br/>
        Reduce Waste
      </h2>
      <Image className={"w-full mb-8"}
             src={"/img/reusable-notebook/dump.jpg"}
             alt={"reusable-reusable-notebook"}
             width={1024}
             height={586}
      />
      <p className={"text-center my-6 mx-10"}>
        Paper production contributes to deforestation, excessive water use, and pollution, with billions of trees cut down annually. The manufacturing process consumes vast resources and releases harmful chemicals into the environment. Most paper products end up in landfills, adding to waste and emissions. By choosing reusable notebooks, you help reduce waste, protect forests, and minimize your environmental footprint.
      </p>
    </article>
  );
}