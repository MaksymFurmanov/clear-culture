import { Product } from "@prisma/client";
import CardItem from "@/containers/user-pages/favorites/card-item";

export default function ListOfFavorites({products}: {
  products: Product[]
}) {
  return (
    <div>
      {products.map((product, index) => {
        return (
          <CardItem key={index}
                    photoUrl={product.photoUrl}
                    name={product.name}
                    productId={product.id}
          />
        );
      })}
    </div>
  );
}