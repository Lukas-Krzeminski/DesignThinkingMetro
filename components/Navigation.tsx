"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Train } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060d1a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-[#1a2a45] border border-white/10 flex items-center justify-center shrink-0">
            <Train className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold tracking-tight text-sm sm:text-base whitespace-nowrap">
            Metro Wayfinding Prototype
          </span>
        </Link>

        {/* Right: Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
              pathname === "/"
                ? "text-white bg-white/10"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Prototype
          </Link>
          <Link
            href="/machine"
            className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 border ${
              pathname === "/machine"
                ? "bg-white text-slate-900 border-white"
                : "border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            }`}
          >
            Test the Machine
          </Link>
        </div>
      </div>
    </nav>
  );
}
