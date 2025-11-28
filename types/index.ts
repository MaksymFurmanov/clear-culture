import { Prisma } from "@prisma/client";
import { ImgHTMLAttributes } from "react";
import { AlertType } from "@/components/alert";

export type ImgWithCaption = {
  src: string,
  caption: string
} & ImgHTMLAttributes<HTMLElement>;

type Link = {
  href: string
}

export type TextLink = {
  label: string,
} & Link;

export type IconLinkWithCaption =
  ImgWithCaption & Link;

export type ImgLinkWithMetrics = {
  src: string,
  rotate?: string,
  alt: string,
  width: number,
  height: number
} & Link & ImgHTMLAttributes<HTMLElement>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true
  }
}>;

export type AlertProps = {
  uid: string,
  type: AlertType,
  title: string,
  message?: string
}