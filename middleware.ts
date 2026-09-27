import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static assets and internal routes bypass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/public") ||
    pathname.includes("/favicon.ico") ||
    pathname.match(/\.(svg|png|jpg|jpeg|webp|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Read role cookie
  const roleCookie = request.cookies.get("kiit_demo_role")?.value;

  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedHost = pathname.startsWith("/host");
  const isProtectedStudent = pathname.startsWith("/student");

  // 3. Admin path guard
  if (isProtectedAdmin) {
    if (!roleCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (roleCookie !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // 4. Host path guard
  if (isProtectedHost) {
    if (!roleCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (roleCookie !== "HOST" && roleCookie !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // 5. Student path guard (Accessible by Student, Host, Admin if logged in)
  if (isProtectedStudent) {
    if (!roleCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/host/:path*",
    "/student/:path*",
  ],
};
