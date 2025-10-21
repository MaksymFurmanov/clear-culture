import CardItem from "@/containers/user-pages/favorites/card-item";
import { getFavoriteProducts } from "@/lib/actions/favorite-product";

export default async function ListOfFavorites() {
  const products = await getFavoriteProducts();

  return (
    <div>
      {products.map((product, index) => {
        return (
          <CardItem key={index}
                    photoUrl={product.photoUrl}
                    name={product.name}
                    productId={product.id}
                    groupId={product.groupId}
          />
        );
      })}
    </div>
  );
}