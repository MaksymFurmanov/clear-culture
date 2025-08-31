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
    "/order/:path*",
    "/orders/:path*",
    "/favorites/:path*",
    "/new-adress/:path*",
    "/payment/:path*",
    "/payment-success/:path*"
  ]
};