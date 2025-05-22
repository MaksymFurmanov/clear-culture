import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/order", "/orders", "/favorites",
  "/new-adress", "/payment", "/payment-success"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const hasSession = Boolean(session /*await decrypt(cookie)*/);

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL("/log-in", req.nextUrl));
  }

  return NextResponse.next();
}