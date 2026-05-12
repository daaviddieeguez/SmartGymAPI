"use client";

import { useState } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50 shadow-sm text-white">
      <div className="px-6 py-4 flex justify-between items-center w-full">
        
        {/* Logo Section */}
        <Link href="/dashboard" className="flex items-center gap-3 group" onClick={closeMenu}>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-gray-300 transition-colors">
            SMART GYM
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/members" className="hover:text-white transition-colors">Members</Link>
            <Link href="/monitors" className="hover:text-white transition-colors">Staff</Link>
            <Link href="/activities" className="hover:text-white transition-colors">Activities</Link>
          </div>

          <div className="flex items-center gap-5 border-l border-zinc-800 pl-6">
            <Link href="/login" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider">
              Log In
            </Link>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 shadow-inner hover:ring-2 hover:ring-white transition-all cursor-pointer"></div>
          </div>
        </div>
        <button 
          className="md:hidden text-white hover:text-gray-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <MdClose className="w-6 h-6" />
          ) : (
            <RxHamburgerMenu className="w-6 h-6" />
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-800 shadow-lg absolute w-full">
          <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/dashboard" onClick={closeMenu}>Dashboard</Link>
            <Link href="/members" onClick={closeMenu}>Members</Link>
            <Link href="/monitors" onClick={closeMenu}>Staff</Link>
            <Link href="/activities" onClick={closeMenu}>Activities</Link>
            <hr className="border-zinc-800 my-2" />
            <Link href="/login" onClick={closeMenu} className="text-black">Log In</Link>
          </div>
        </div>
      )}
    </nav>
  );
};