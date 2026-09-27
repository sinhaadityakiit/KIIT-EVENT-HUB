import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "KSAC Events Hub (Sample Project) | Unofficial Demo",
  description: "Independent educational demonstration and sample project for campus event management. Unofficial project, not affiliated with or endorsed by KIIT.",
  keywords: ["KIIT", "KSAC", "Student Project", "Campus Events", "Sample Project", "Educational Demo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-600 selection:text-white`}>
        <DisclaimerBanner variant="top-bar" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
