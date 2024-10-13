import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/db";

export function createClerkSupabaseClientSsr(requireAuth = true) {
  // The `useAuth()` hook is used to access the `getToken()` method
  const { getToken } = auth();

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const headers = new Headers(options?.headers);

          if (requireAuth) {
            const clerkToken = await getToken({ template: "supabase" });
            if (!clerkToken) {
              throw new Error("Authentication required");
            }
            headers.set("Authorization", `Bearer ${clerkToken}`);
          }

          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    },
  );
}
