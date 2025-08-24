import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import ProductsInCartProvider from "@/providers/products-in-cart-provider";

/*const railway = localFont({
  src: "/fonts/Raleway-VariableFont_wght.ttf",
  weight: "100 900"
});*/

/*
const railwayItalic = localFont({
  src: "./fonts/Raleway-Italic-VariableFont_wght.ttf",
  weight: "100 900"
});
*/

const abel = localFont({
  src: "./../public/fonts/Abel-Regular.ttf",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Clear Culture",
  description: "Online shop of eco-products"
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: ReactNode,
}>) {
  return (
    <html lang="en">
    <body className={`${abel.className} text-sm antialiased md:text-base`}>
      <ProductsInCartProvider>
        {children}
      </ProductsInCartProvider>
    </body>
    </html>
  );
}
