import { ProductVariant } from "@/types/database";

export type ImgListItem = {
  src: string,
  alt: string,
  width: number,
  height: number,
  rotate?: string
}

export type TextLink = {
  label: string,
  href: string
}

export type IconLink = {
  iconHref: string,
} & TextLink;

export type ImgLink = {
  href: string
} & ImgListItem;

export type CartItem = {
  productVariant: ProductVariant,
  count: number,
  discountInPercentage?: number
}