import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "./ui/sonner";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster richColors />
      <MantineProvider>{children}</MantineProvider>
    </ClerkProvider>
  );
}

export default Providers;
