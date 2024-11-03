import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Rubik } from "next/font/google";
import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import Providers from "@/components/providers";
import { getCurrentLocale } from "@/utils/getLocaleServer";

export const metadata: Metadata = {
  title: "Gaza in Memory | Preserving Stories of Lives Lost",
  description:
    "A digital memorial dedicated to preserving and honoring the memories of lives lost in Gaza. Share stories, memories, and pay tribute to loved ones.",
  keywords:
    "Gaza, memorial, remembrance, Palestine, memories, tribute, martyrs",
  authors: [{ name: "Gaza in Memory Team" }],
  openGraph: {
    title: "Gaza in Memory | Preserving Stories of Lives Lost",
    description:
      "A digital memorial dedicated to preserving and honoring the memories of lives lost in Gaza.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    siteName: "Gaza in Memory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaza in Memory | Preserving Stories of Lives Lost",
    description:
      "A digital memorial dedicated to preserving and honoring the memories of lives lost in Gaza.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#ffffff",
};

const rubik = Rubik({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-rubik",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getCurrentLocale();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${GeistSans.className} ${rubik.variable}`}>
        <Providers>
          <main className="mx-auto max-w-[1750px]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
