import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUNO — Learn Languages Through Practice",
  description:
    "LUNO helps you learn Russian and German through short, interactive lessons, vocabulary practice, and real conversations. Build streaks, earn XP, and track your progress.",
  keywords: [
    "language learning",
    "Russian",
    "German",
    "gamified learning",
    "vocabulary",
    "pronunciation",
    "interactive lessons",
  ],
  openGraph: {
    title: "LUNO — Learn Languages Through Practice",
    description:
      "Master Russian and German with interactive lessons, vocabulary practice, and AI-powered conversations.",
    type: "website",
    siteName: "LUNO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
