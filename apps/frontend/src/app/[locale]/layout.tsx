import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/app/[locale]/_components/navbar";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "Gaza in Memory",
  description: "Not Just a Numbers, They Are Stories Unfinished",
};

export default async function RootLayout(
  props: {
    children: React.ReactNode;

    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  return (
    <main className="mx-auto grid h-dvh max-w-[1750px] grid-rows-[auto,1fr]">
      <Navbar locale={locale} />
      <div className="h-full">{children}</div>
    </main>
  );
}
