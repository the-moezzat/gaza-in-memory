import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextMiddleware, NextResponse } from "next/server";

export function authMiddleware(): NextMiddleware {
  const isProtectedRoute = createRouteMatcher([
    "/(.*)/dashboard(.*)",
    "/(.*)/add-martyrs(.*)",
  ]);

  return clerkMiddleware((auth, req) => {
    if (!auth().userId && isProtectedRoute(req)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  });
}
