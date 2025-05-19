export type User = {
  id: string,
  name: string,
  phone_number: string,
  password: string
}

export interface ProductGroup {
  id: string,
  name: string,
  classic_variant_id: string,
  description?: string,
  page_url?: string,
}

export type ProductVariant = {
  id: string,
  product_id: string,
  name: string,
  price: number,
  photo_url: string,
  color?: string,
  colorHEX?: string,
  size?: number,
  volume?: string,
  amount_for_one?: number
}

export type FavoriteProduct = {
  id: string,
  user_id: string,
  product_variant_id: string
}

export type Order = {
  id: string,
  user_id: string,
  created_date: string,
  processed_date?: string,
  shipped_date?: string,
  arriving_date?: string,
  price: number,
  delivery: number,
  status: "Processing" | "Processed" | "Shipped" | "Arrived" | "Canceled"
}

export type OrderItem = {
  order_id: string,
  product_variant_id: string,
  amount: number
}

export type Adress = {
  id: string,
  user_id: string,
  name: string,
  surname: string,
  email: string,
  phone_number: string,
  country: string,
  city: string,
  street_adress: string,
  postal_code: string
}