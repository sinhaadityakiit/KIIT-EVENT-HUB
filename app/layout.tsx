import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "KSAC Events Hub | KIIT University",
  description: "Official Campus Event Management, Ticketing, and Approvals Platform for KIIT University (Kalinga Institute of Industrial Technology, Bhubaneswar).",
  keywords: ["KIIT", "KSAC", "Bhubaneswar", "Campus Events", "KRS", "Korus", "Hackathon", "Student Activity Centre"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-600 selection:text-white`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
