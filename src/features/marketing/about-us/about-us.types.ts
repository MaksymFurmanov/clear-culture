import { ImgHTMLAttributes } from "react";

export type Achievement = {
  src: string,
  caption: string
} & ImgHTMLAttributes<HTMLElement>;