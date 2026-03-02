import AddToCartField from "@/src/features/products/product/ui/AddToCartField";
import AddToFavoritesBtn from "@/src/features/products/product/ui/AddToFavoritesBtn";

export default function Info() {
  return (
    <div className={"w-1/2"}>
      <AddToCartField/>

      <AddToFavoritesBtn />
    </div>
  );
}