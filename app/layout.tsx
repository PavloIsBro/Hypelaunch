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
  title: "Hypelaunch — Make memecoin with one prompt",
  description:
    "AI-powered crypto launch workflow. Turn one idea into a memecoin launch kit: name, ticker, Interest Score, landing, and X/Telegram content.",
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
