import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Gym | Ultimate Fitness Companion",
  description:
    "Manage your gym, track activities, and achieve your fitness goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-black text-white px-8 py-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors"
            >
              SMART GYM
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/members"
                className="hover:text-blue-400 transition-colors font-medium"
              >
                Members Dashboard
              </Link>
              <Link
                href="/login"
                className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
