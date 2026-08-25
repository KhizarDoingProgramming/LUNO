import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "LUNO - Learn Languages Through Practice",
  description:
    "Master Russian and German through interactive lessons, spaced repetition, and gamified learning. Start your language journey today.",
  keywords: [
    "language learning",
    "Russian",
    "German",
    "interactive lessons",
    "gamification",
    "spaced repetition",
  ],
  openGraph: {
    title: "LUNO - Learn Languages Through Practice",
    description:
      "Master Russian and German through interactive lessons and gamified learning.",
    type: "website",
    siteName: "LUNO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
