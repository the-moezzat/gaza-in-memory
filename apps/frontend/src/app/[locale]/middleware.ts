import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { defaultLocale, supportedLocale } from "@/lib/supportedLanguages";

export function localeMiddleware(middleware: NextMiddleware): NextMiddleware {
  return (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;
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
      }
    }

    return middleware(request, event);
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
    .sort((a, b) => b.q - a.q); // Sort by quality score

  console.log(languages);

  for (const language of languages) {
    console.log(language);
    const locale = language.locale.split("-")[0]; // Convert 'en-US' to 'en'
    if (supportedLocales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}
