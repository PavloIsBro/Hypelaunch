import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SolanaProviders } from "@/components/SolanaProviders";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Hypelaunch — Memecoin Market Intelligence",
  description:
    "AI market intelligence and launch readiness for Pump.fun-style memecoin launches. Scores, competitor analysis, timing signals, and landing concepts.",
  metadataBase: new URL("https://hypelaunch.space"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <SolanaProviders>
          <SiteHeader />
          <main className="relative min-h-screen pt-14 sm:pt-16">{children}</main>
        </SolanaProviders>
      </body>
    </html>
  );
}
