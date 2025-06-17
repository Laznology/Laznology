import type { Metadata } from "next";
import { Geist, Antonio, JetBrains_Mono, Yuji_Hentaigana_Akari, Rampart_One, Noto_Serif_JP, Zen_Maru_Gothic } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import PageIndicatorsWrapper from "@/components/page-indicators-wrapper"
import CornerDecorationsWrapper from "@/components/corner-decorations-wrapper"

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Laznology - Kodenee Programinyaan",
  description: "%s | Laznology Portfolio",
};

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  display: "swap",
  subsets: ["latin"],
});

const yujiHentaiganaAkari = Yuji_Hentaigana_Akari({
  variable: "--font-yuji-hentaigana",
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

const rampartOne = Rampart_One({
  variable: "--font-rampart-one",
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} ${antonio.variable} ${jetBrainsMono.variable} ${yujiHentaiganaAkari.variable} ${rampartOne.variable} ${notoSerifJP.variable} ${zenMaruGothic.variable} antialiased bg-background min-h-screen`}>
        {/* @ts-expect-error Server Component - next-themes is not yet fully typed for app router */}
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
  );
}
