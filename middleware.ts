import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const isAuth = !!token;

  // Allow both sign-in and sign-up pages
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all paths except:
    // - API routes
    // - static files
    // - favicon
    // - sign-in and sign-up pages
    // - public assets
    "/((?!api|_next/static|favicon.ico|sign-in|sign-up|public).*)",
  ],
};
