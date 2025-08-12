import { Decimal } from "@prisma/client/runtime/library"

export type User = {
  id: number,
  name: string,
  email: string,
  password: string
}

export interface ProductGroup {
  id: number,
  name: string,
  defaultProductId: number | null,
  descriptionUrl: string | null,
  pageUrl: string | null
}

export type Product = {
  id: number,
  groupId: number,
  name: string,
  price: Decimal,
  photoUrl: string,
  color: string | null,
  colorHEX: string | null,
  size: string | null,
  volume: string | null,
  amountForOne: number | null
}

export type ClientProduct = Omit<Product, "price"> & {
  price: string
}

export type FavoriteProduct = {
  id: number,
  userId: number,
  productId: number
}

export type Order = {
  id: number,
  userId: number,
  createdDate: string,
  processedDate: string | null,
  shippedDate: string | null,
  arrivingDate: string | null,
  price: Decimal,
  delivery: Decimal,
  status: string
}

export type ClientOrder = Omit<Order, "price" | "delivery"> & {
  price: string,
  delivery: string
}

export type OrderItem = {
  orderId: number,
  productId: number,
  amount: number
}

export type Adress = {
  id: number,
  userId: number,
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  country: string,
  city: string,
  streetAdress: string,
  postalCode: string
}