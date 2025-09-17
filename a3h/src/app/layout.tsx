import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A3H Photography - Photographe à Morges et la Côte",
  description: "Photographe professionnel à Morges, Nyon et Lausanne. Headshots, restaurants et événements privés. Livraison express J+0/J+1, studio mobile.",
  keywords: "photographe, Morges, Nyon, Lausanne, headshots, portraits, restaurants, événements, studio mobile",
  authors: [{ name: "Alexis3H" }],
  creator: "A3H Photography",
  publisher: "A3H Photography",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "https://a3h.photography",
    siteName: "A3H Photography",
    title: "A3H Photography - Photographe à Morges et la Côte",
    description: "Photographe professionnel à Morges, Nyon et Lausanne. Headshots, restaurants et événements privés.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
