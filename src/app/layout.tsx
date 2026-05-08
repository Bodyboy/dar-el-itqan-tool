import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { BottomNav } from "@/components/layout/BottomNav";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { RegisterSW } from "@/components/layout/RegisterSW";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dar El Itqan - Outils BTP",
  description: "Boîte à outils pour professionnels du bâtiment",
  manifest: "/manifest.json",
  themeColor: "#333333",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dar El Itqan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <main className="flex-1 pb-24 max-w-lg mx-auto w-full">
            {children}
          </main>
          <BottomNav />
          <RegisterSW />
        </ThemeProvider>
      </body>
    </html>
  );
}
