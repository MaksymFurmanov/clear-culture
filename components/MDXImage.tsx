import Image, { ImageProps } from "next/image";
import React from "react";
import clsx from "clsx";

export default function MDXImage({
                                   src,
                                   alt,
                                   width,
                                   height,
                                   style,
                                   className,
                                 }: {
  style?: React.CSSProperties,
  className?: string,
} & Omit<ImageProps, "layout">) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={clsx(className, "MDXImage")}
      sizes="(max-width: 100vw) 100vw, auto"
    />
  );
}
