import type { Metadata } from "next";
import { Playfair_Display, Jost, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "WestBev Africa — Private Ordering Portal",
  description: "Purveyors of Fine Liquors, Wines & Champagnes in West Africa. Exclusive portal for diplomatic & corporate clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable} ${greatVibes.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
