// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

type Role = "ADMIN" | "MANAGER" | "TECHNICIAN" | "VIEWER";

// Routes anyone can access without being logged in
const PUBLIC_ROUTES = ["/", "/login", "/register"];

// Routes restricted by role
const ROLE_ROUTES: Record<string, Role[]> = {
  "/admin": ["ADMIN"],
  "/manager": ["ADMIN", "MANAGER"],
  "/technician": ["ADMIN", "MANAGER", "TECHNICIAN"],
  "/viewer": ["ADMIN", "MANAGER", "TECHNICIAN", "VIEWER"],
};

// Routes that authenticated users should be bounced away from
const AUTH_ONLY_ROUTES = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // Redirect authenticated users away from login/register
  if (AUTH_ONLY_ROUTES.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!PUBLIC_ROUTES.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based access control
  if (isAuthenticated && token.role) {
    const userRole = token.role as Role;
    for (const [route, allowedRoles] of Object.entries(ROLE_ROUTES)) {
      if (pathname.startsWith(route) && !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
