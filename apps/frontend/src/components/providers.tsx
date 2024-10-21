import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "./ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Analytics />
      <SpeedInsights />
      <Toaster richColors />
      <MantineProvider>{children}</MantineProvider>
    </ClerkProvider>
  );
}

export default Providers;
