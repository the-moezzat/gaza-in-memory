import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { defaultLocale, supportedLocale } from "@/lib/supportedLanguages";
import { NextMiddlewareResult } from "next/dist/server/web/types";

const LOCALE_HEADER = "x-language";
const DEFAULT_LOCALE = defaultLocale;
const SUPPORTED_LOCALES = supportedLocale;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export function localeMiddleware(middleware: NextMiddleware): NextMiddleware {
  return (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;

    // Skip for static files and API routes
    if (
      path.includes(".") ||
      path.startsWith("/_next") ||
      path.startsWith("/api")
    ) {
      return middleware(request, event);
    }

    // let response: NextResponse | NextMiddlewareResult;

    if (path === "/") {
      // Get the preferred languages from the 'Accept-Language' header
      const preferredLanguages = request.headers.get("accept-language");
      const preferredLocale = parseAcceptLanguage(
        preferredLanguages!,
        supportedLocale,
        defaultLocale,
      );

      // Redirect if the preferred locale does not match the current locale
      if (preferredLocale && preferredLocale !== request.nextUrl.locale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${preferredLocale}${url.pathname}`;
        return NextResponse.redirect(url);
      } else {
        // If no redirect needed, continue with the middleware chain
        return middleware(request, event);
      }
    } else {
      // For non-root paths, continue with the middleware chain
      // set the locale header here
      const currentLocale = path.split("/")[1] as Locale;
      const locale = SUPPORTED_LOCALES.includes(currentLocale)
        ? currentLocale
        : DEFAULT_LOCALE;

      request.headers.set(LOCALE_HEADER, locale);
      return middleware(request, event);
    }

    // // If no response was generated, create a default response
    // if (!response) {
    //   response = NextResponse.next();
    // }

    // // Ensure we're working with a NextResponse
    // const nextResponse =
    //   response instanceof NextResponse ? response : NextResponse.next();

    // // Get the current locale from the URL path
    // const currentLocale = path.split("/")[1] as Locale;
    // const locale = SUPPORTED_LOCALES.includes(currentLocale)
    //   ? currentLocale
    //   : DEFAULT_LOCALE;

    // // Set the language header on the response
    // nextResponse.headers.set(LOCALE_HEADER, locale);

    // return nextResponse;
  };
}

function parseAcceptLanguage(
  header: string,
  supportedLocales: string[],
  defaultLocale: string,
) {
  if (!header) return defaultLocale;

  const languages = header
    .split(",")
    .map((part) => {
      const [locale, q] = part.split(";q=");
      return { locale: locale.trim(), q: Number(q) || 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const language of languages) {
    const locale = language.locale.split("-")[0];
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}
