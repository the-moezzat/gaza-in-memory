import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/app/[locale]/_components/navbar";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "Gaza in Memory",
  description: "Not Just a Numbers, They Are Stories Unfinished",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;

  params: { locale: string };
}) {
  return (
    <main className="mx-auto max-w-[1750px]">
      <Navbar locale={locale} />
      {children}
    </main>
  );
}
