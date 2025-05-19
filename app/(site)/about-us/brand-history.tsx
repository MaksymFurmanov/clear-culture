import Image from "next/image";

export default function BrandHistory() {
  return (
    <section className={"mx-auto max-w-4/5 md:w-3/5 mb-12"}>
      <p className={"text-center mx-4 mb-8"}>
        Our core values include transparency, innovation, and a commitment to reducing our environmental footprint. At
        the heart of our company is the belief that businesses can be a force for good, contributing to a healthier
        planet for future generations.
      </p>
      <Image className={"mb-8"}
             src={"/img/about-us/history.svg"}
             alt={"Brand history"}
             width={1000}
             height={500}
      />
      <p className={"text-center mx-4"}>
        Clear Culture was founded with a mission to revolutionize the way we approach everyday products by prioritizing
        sustainability and reducing environmental impact. From the very start, we committed to eliminating plastic
        waste, which led to the launch of our first biodegradable product line. As our dedication to eco-friendly
        innovation gained momentum, we quickly expanded beyond borders, making our reusable eye masks, pads, notebooks,
        and cups available to a growing global community of like-minded customers.
        <br /><br />
        Our journey has been marked by milestones such as becoming a certified B Corporation, a recognition of our high
        standards for social and environmental performance. Achieving carbon-neutral status remains one of our proudest
        accomplishments, as we strive to minimize our footprint while delivering high-quality, sustainable products.
        <br /><br />
        At Clear Culture, innovation and integrity go hand in hand. We continue to develop new solutions to everyday
        needs, offering eco-conscious alternatives for customers who want to make a positive impact on the planet.
        Together, we are building a more sustainable future, one thoughtful product at a time.
      </p>
    </section>
  );
}