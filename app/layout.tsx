import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quicknotedeals.com"),
  title: "Picksur Homes | Private Mortgage Note Investing",
  description:
    "Institutional-grade access to first-lien mortgage notes across 14 states. Consistent monthly distributions secured by real property.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Picksur Homes | Private Mortgage Note Investing",
    description:
      "Institutional-grade access to first-lien mortgage notes across 14 states. Consistent monthly distributions secured by real property.",
    url: "https://quicknotedeals.com",
    siteName: "Picksur Homes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Picksur Homes | Private Mortgage Note Investing",
    description:
      "Institutional-grade access to first-lien mortgage notes across 14 states. Consistent monthly distributions secured by real property.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable}`}
    >
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
