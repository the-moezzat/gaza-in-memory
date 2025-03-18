import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/app/[locale]/_components/navbar";
import "@mantine/core/styles.css";
import type { SupportedLocale } from "@/lib/supportedLanguages";

export const metadata: Metadata = {
  title: "Gaza in Memory",
  description: "Not Just a Numbers, They Are Stories Unfinished",
};

export default function RootLayout(props: {
  children: React.ReactNode;

  params: { locale: SupportedLocale };
}) {
  const { locale } = props.params;

  const { children } = props;

  return (
    <main className="mx-auto grid h-dvh max-w-[1750px] grid-rows-[auto,1fr]">
      <Navbar locale={locale} />
      <div className="h-full w-full">{children}</div>
    </main>
  );
}
