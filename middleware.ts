import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      }
    },
    pages: {
      signIn: "/log-in"
    }
  }
);

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