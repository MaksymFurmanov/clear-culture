import postgres from 'postgres';
import { ProductGroup } from "@/types/database";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProducts() {
  return sql<ProductGroup[]>`SELECT *FROM products`;
}