import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
