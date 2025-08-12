import { ClientProduct, Product } from "@/types/database";

export default function productsToClientProducts(products: Product[]): ClientProduct[] {
  return products.map((product) => {
    return {...product, price: product.price.toString()}
  });
}