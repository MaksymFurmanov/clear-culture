import ShoppingLink from "@/containers/site-pages/eye-masks/shopping-link";
import MasksTypes from "@/containers/site-pages/eye-masks/masks-types";
import Colors from "@/containers/site-pages/eye-masks/colors";

export default function Introduction() {
  return (
    <section className="relative w-full mb-36">
      <div
        className="
          md:absolute
          translate-x-1/2
          md:translate-x-1/10
          lg:translate-x-1/3
          lg:translate-y-1/12
          w-1/2
          max-w-sm
          z-10
        "
      >
        <ShoppingLink />
      </div>

      <div className={"md:translate-y-1/6 lg:translate-y-8"}>
        <MasksTypes />
      </div>

      <div
        className="
          relative
          -translate-x-1/4
          lg:-translate-x-1/3
          float-right
          -translate-y-1/2
          lg:-translate-y-[235%]
          z-10
        "
      >
        <Colors />
      </div>
    </section>
  );
}
