import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple middleware - auth is checked at the page/API level
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public pages
  const publicPages = ["/", "/auth/login", "/auth/signup"];
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow API routes and static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
