import { getFavoriteProducts } from "@/src/lib/actions/favorites";
import CardItem from "@/src/features/user/favorites/ui/CardItem";
import { PiPackage } from "react-icons/pi";

export default async function ListOfFavorites() {
  const products = await getFavoriteProducts();

  return (
    <div>
      {products.map((product, index) => {
        return product.photoUrl ? (
          <CardItem key={index}
                    photoUrl={product.photoUrl}
                    name={product.name}
                    productId={product.id}
                    groupId={product.groupId}
          />
        ) : (
          <PiPackage />
        )
      })}
    </div>
  );
}