import type { Metadata } from "next";
import "./globals.css";
import { getDefaultMetadata } from "../lib/metadata";

export const metadata: Metadata = getDefaultMetadata();

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
