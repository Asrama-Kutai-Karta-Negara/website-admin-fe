import { formatMessage } from "@interfaces/data-types";
import SatellitePublic from "@services/satellite/public";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("TOKEN_AUTH")?.value;
  const path = request.nextUrl.pathname;
  
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isValidToken = await validateToken(token);

  if (!isValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export async function validateToken(token: string) {
  try {
    const res = await SatellitePublic.post<formatMessage>("/auth/check-token", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = res.data;
    if (response.success === true) {
      return {
        isValid: true,
        message: response.message,
      };
    }
    return {
      isValid: false,
      message: response.message,
    };
  } catch (error) {
    return {
      isValid: false,
      message: error,
    };
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)', // Match all routes except the excluded ones
  ],
};