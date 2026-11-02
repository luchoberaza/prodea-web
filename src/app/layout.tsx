import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRODEA — Protección y Defensa Animal",
  description:
    "Refugio de animales dedicado al rescate, rehabilitación y adopción responsable. Cada vida merece un hogar lleno de amor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-screen font-body">{children}</body>
    </html>
  );
}
