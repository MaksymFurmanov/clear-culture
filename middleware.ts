import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/log-in", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/account/:path*",
    "/order/:path*",
    "/orders/:path*",
    "/favorites/:path*",
    "/choose-address/:path*",
    "/address-book/:path*",
    "/new-address/:path*",
    "/payment/:path*",
    "/payment-success/:path*"
  ]
};