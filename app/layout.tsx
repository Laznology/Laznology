import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import PageIndicatorsWrapper from "@/components/page-indicators-wrapper";
import CornerDecorationsWrapper from "@/components/corner-decorations-wrapper";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

const iconVersion = "v=2";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Laznology - Kodenee Programinyaan",
  description: "%s | Laznology Portfolio",
  icons: {
    icon: `/favicon.ico?${iconVersion}`,
    shortcut: `/favicon.ico?${iconVersion}`,
    apple: `/apple-touch-icon.png?${iconVersion}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-SZ8NVJ306L"
          />
          <Script id="google-analytics">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SZ8NVJ306L');
          `}
          </Script>
        </head>
        <body className="font-sans antialiased bg-background min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            disableTransitionOnChange
          >
            <div className="h-screen py-4 px-2 md:py-6 md:px-4 lg:py-8 lg:px-8 flex flex-col">
              <div className="flex-1 border rounded-xl border-border flex flex-col overflow-hidden relative">
                <header className="px-4 py-2 bg-background border-b border-border flex-shrink-0">
                  <Navbar />
                </header>
                <main className="flex-1 overflow-hidden relative">
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <PageIndicatorsWrapper />
                    <CornerDecorationsWrapper />
                  </div>
                  <div className="h-full overflow-y-auto scrollable-content relative">
                    {children}
                  </div>
                </main>
                <Footer />
                <Toaster position="bottom-center" richColors />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
