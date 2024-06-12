import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export function localeMiddleware(middleware: NextMiddleware): NextMiddleware {
  return (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;
    console.log(path);
    if (path === "/") {
      const defaultLocale = "en"; // Default language for your site
      const supportedLocales = ["en", "de", "fr", "es", "ar"]; // Your supported languages

      // Get the preferred languages from the 'Accept-Language' header
      const preferredLanguages = request.headers.get("accept-language");
      const preferredLocale = parseAcceptLanguage(
        preferredLanguages!,
        supportedLocales,
        defaultLocale,
      );

      // Redirect if the preferred locale does not match the current locale
      if (preferredLocale && preferredLocale !== request.nextUrl.locale) {
        const url = request.nextUrl.clone();
        url.pathname = `/${preferredLocale}${url.pathname}`;
        return NextResponse.redirect(url);
      }

      console.log(preferredLocale);
    }

    return middleware(request, event);
  };
}

export function middleware(request: NextRequest) {}

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
    .sort((a, b) => b.q - a.q); // Sort by quality score

  for (const language of languages) {
    const locale = language.locale.split("-")[0]; // Convert 'en-US' to 'en'
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}
