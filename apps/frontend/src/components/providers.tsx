import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <MantineProvider>{children}</MantineProvider>
    </ClerkProvider>
  );
}

export default Providers;
