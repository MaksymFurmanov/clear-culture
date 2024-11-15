import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const railway = localFont({
  src: "./fonts/Raleway-VariableFont_wght.ttf",
  weight: "100 900"
});

/*
const railwayItalic = localFont({
  src: "./fonts/Raleway-Italic-VariableFont_wght.ttf",
  weight: "100 900"
});
*/

export const metadata: Metadata = {
  title: "Clear Culture",
  description: "Online shop of eco-products"
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${railway.className} text-sm antialiased md:text-base`}>
    {children}
    </body>
    </html>
  );
}
