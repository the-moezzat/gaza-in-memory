import Providers from "@/components/providers";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
    <html>
      <body>{children}</body>
    </html>
        </Providers>

  );
}

export default Layout;
