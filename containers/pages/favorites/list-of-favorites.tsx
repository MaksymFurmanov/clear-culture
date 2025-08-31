import CardItem from "@/containers/pages/favorites/card-item";
import { Product } from "@prisma/client";

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