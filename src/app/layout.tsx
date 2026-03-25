import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Police titres — Space Grotesk
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Police corps — Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pronto Studio — Agence IA Marketing",
  description:
    "Pronto Studio — L'agence IA qui fait travailler vos agents marketing 24h/24. SEO, contenus, publicités — automatisés et optimisés en continu.",
  keywords: ["agence IA", "marketing digital", "automation", "SEO", "agents IA", "Forbach"],
  openGraph: {
    title: "Pronto Studio — Agence IA Marketing",
    description: "Vos agents IA marketing travaillent pendant que vous dormez.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#080808] text-[#F5F5F5] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
