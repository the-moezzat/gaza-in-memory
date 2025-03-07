import { ClerkProvider } from "@clerk/nextjs";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Toaster } from "./ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { arSA, enUS } from "@clerk/localizations";
import { PostHogIdentifier } from "./posthog-identifier";
import type { ReactNode } from "react";
import { AnalyticsProvider } from "@repo/analytics";
import { TooltipProvider } from "./ui/tooltip";
import ReactQueryProvider from "./react-query-provider";
import { getCurrentLocale } from "@/utils/getLocaleServer";

// const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
  const locale = getCurrentLocale();

  const localization = locale === "ar" ? arSA : enUS;

  return (
    <ReactQueryProvider>
      <ClerkProvider localization={localization}>
        <AnalyticsProvider>
          <Analytics />
          <PostHogIdentifier />
          <SpeedInsights />
          <Toaster richColors dir={locale === "ar" ? "rtl" : "ltr"} />
          <DirectionProvider>
            <MantineProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </MantineProvider>
          </DirectionProvider>
        </AnalyticsProvider>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}

export default Providers;
