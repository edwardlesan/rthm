import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Secret used to encode JWT, same as in your [...nextauth].ts
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in");

  if (!isAuth && !isAuthPage) {
    // Redirect to sign-in if not authenticated
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If authenticated or on auth page, allow
  return NextResponse.next();
}

// Apply to all routes inside app/ except static files and public routes
export const config = {
  matcher: [
    /*
      Protect all paths EXCEPT:
      - /api/* (APIs)
      - /_next/static/* (static files)
      - /favicon.ico
      - /sign-in (login page)
      - /public/*
    */
    "/((?!api|_next/static|favicon.ico|sign-in|public).*)",
  ],
};
