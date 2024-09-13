import { ReactNode } from "react";
import {
  ClerkProvider,
} from '@clerk/nextjs'

function Providers({children}: {children: ReactNode}) {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    );
}

export default Providers;