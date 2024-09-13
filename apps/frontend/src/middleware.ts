import { localeMiddleware } from "./app/[locale]/middleware";
import { chain } from "@/lib/chain";
import { authMiddleware } from "./app/auth-middleware";

export const middleware = chain([localeMiddleware, authMiddleware]);

// Function to parse the 'Accept-Language' header and find the best match
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};
