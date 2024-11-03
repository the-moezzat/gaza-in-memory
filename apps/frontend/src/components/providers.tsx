"use client";
import { ReactNode, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Toaster } from "./ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { arSA, enUS } from "@clerk/localizations";
import { useCurrentLocale } from "@/utils/useCurrentLocale";

// const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const locale = useCurrentLocale();

  const localization = locale === "ar" ? arSA : enUS;

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider localization={localization}>
        <Analytics />
        <SpeedInsights />
        <Toaster richColors dir={locale === "ar" ? "rtl" : "ltr"} />
        <DirectionProvider>
          <MantineProvider>{children}</MantineProvider>
        </DirectionProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

export default Providers;
