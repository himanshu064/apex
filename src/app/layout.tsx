import type { Metadata, Viewport } from "next";
import { Anton, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

/* Type system, Swiss racing poster:
   Anton          → condensed uppercase display headlines
   Space Grotesk  → body / descriptions
   IBM Plex Mono  → timing boards, sector labels, data                   */

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "APEX | The Racing Works",
  description:
    "Apex is an independent racing works chasing hundredths of a second. Scroll the season: four circuits, one car, and a crew that measures its life in 1.9-second pit stops.",
  keywords: ["racing", "motorsport", "grand prix", "racing team"],
};

export const viewport: Viewport = {
  themeColor: "#efefea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${grotesk.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body">{children}</body>
    </html>
  );
}
