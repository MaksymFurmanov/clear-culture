import CardItem from "@/containers/pages/favorites/card-item";
import { getFavoriteProductsByUserId } from "@/lib/actions/favoriteProduct";
import { Product, User } from "@prisma/client";
import { cookies } from "next/headers";

export default async function ListOfFavorites() {
  const user = await cookies().then(value => {
    return value.get("session")?.value;
  }) as User;
  if(!user) throw new Error("Internal server error");
  const products: Product[] = await getFavoriteProductsByUserId(user.id);

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