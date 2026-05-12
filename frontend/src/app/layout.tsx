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
      <body className="min-h-full flex flex-col bg-gray-50/50 text-gray-900">
        <nav className="bg-black border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
          <div className="w-full flex justify-between items-center">
            
            {/* Logo Section */}
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
            >
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-600 transition-colors">
                SMART GYM
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-6 text-[11px] font-bold text-white uppercase tracking-widest">
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                <Link href="/members" className="hover:text-blue-600 transition-colors">
                  Members
                </Link>
                <Link href="/monitors" className="hover:text-blue-600 transition-colors">
                  Staff
                </Link>
                <Link href="/activities" className="hover:text-blue-600 transition-colors">
                  Activities
                </Link>
              </div>
              <div className="flex items-center gap-5 border-l border-gray-200 pl-6">
                <Link
                  href="/login"
                  className="text-xs font-bold text-white hover:text-blue-600 transition-colors uppercase tracking-wider"
                >
                  Log In
                </Link>
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-gray-200 to-gray-300 border border-gray-200 shadow-inner cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all"></div>
              </div>

            </div>
          </div>
        </nav>
        <main className="grow w-full">
          {children}
        </main>
        
      </body>
    </html>
  );
}
