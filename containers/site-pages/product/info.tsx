import AddToFavoritesButton from "@/containers/site-pages/product/add-to-favorites-button";
import AddToCartField from "@/containers/site-pages/product/add-to-cart-field";

export default function Info() {
  return (
    <div className={"w-1/2"}>
      <AddToCartField/>

      <AddToFavoritesButton />
    </div>
  );
}