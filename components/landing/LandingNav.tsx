"use client";

import Link from "next/link";
import { Droplets, ExternalLink } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";

export function LandingNav() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-slate-200/50 bg-white/95 shadow-sm">
      <div className="px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Droplets className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Aqua<span className="text-blue-600">Sense</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight * 1.4, behavior: 'smooth' })}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Stats
          </button>
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight * 2.8, behavior: 'smooth' })}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Features
          </button>
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login"
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Log in
          </Link>
          <Link 
            href="/signup"
            className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-full hover:bg-blue-600 transition-all shadow-md shadow-slate-900/10 hover:shadow-blue-600/20"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
