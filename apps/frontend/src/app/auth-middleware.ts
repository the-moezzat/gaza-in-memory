import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export function authMiddleware(middleware: NextMiddleware): NextMiddleware {
      return (request: NextRequest, event: NextFetchEvent) => {
        clerkMiddleware()
      }
}