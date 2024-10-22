"use client";
import { ReactNode, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "./ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <Analytics />
        <SpeedInsights />
        <Toaster richColors />
        <MantineProvider>{children}</MantineProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

export default Providers;
