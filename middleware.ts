import { NextResponse, type NextRequest } from "next/server";
import { validateKiitEmail } from "./lib/auth/kiit-validator";

const ROLE_PERMISSIONS = {
  admin: ["ADMIN"],
  host: ["HOST", "ADMIN"],
  student: ["STUDENT", "HOST", "ADMIN"],
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static asset and Next.js internal bypass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/public") ||
    pathname.includes("/favicon.ico") ||
    pathname.match(/\.(svg|png|jpg|jpeg|webp)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Read demo role cookie or header (if using client simulation/session)
  const roleCookie = request.cookies.get("kiit_demo_role")?.value || "STUDENT";

  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedHost = pathname.startsWith("/host");

  // 3. Admin path guard
  if (isProtectedAdmin && !ROLE_PERMISSIONS.admin.includes(roleCookie as any)) {
    // If not admin, check if user is at least logged in or redirect
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 4. Host path guard
  if (isProtectedHost && !ROLE_PERMISSIONS.host.includes(roleCookie as any)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/host/:path*",
  ],
};
