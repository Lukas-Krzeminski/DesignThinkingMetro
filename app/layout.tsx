import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Metro Wayfinding Prototype · MENG 1000",
  description: "Design Thinking Final Prototype: Madrid Metro wayfinding system with color-coded paths, accessibility-first routing, and interactive guidance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} antialiased`}>
      <body className="bg-[#060d1a] text-white min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
