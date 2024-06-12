import { localeMiddleware } from "./app/[locale]/middleware";
import { chain } from "@/lib/chain";

export const middleware = chain([localeMiddleware]);

// Function to parse the 'Accept-Language' header and find the best match
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
