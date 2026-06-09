import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const pathname = request.nextUrl.pathname;
    const isPublicPage = pathname.startsWith("/login") || pathname.startsWith("/register");

    if (!token && !isPublicPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',],
};