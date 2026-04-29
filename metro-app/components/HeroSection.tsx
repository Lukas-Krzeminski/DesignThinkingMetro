"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LINE_COLORS = [
  "#38ADEF", "#CC0000", "#E6C900", "#994400",
  "#88CC00", "#888888", "#F88B00", "#F57FB0", "#9B0099", "#1E3F8B", "#007346",
];

const MEMBERS = ["Lukas", "Max", "Mia", "Sierra", "Mo", "Jed"];

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#060d1a] flex flex-col justify-center overflow-hidden">

      {/* Very subtle background texture only - no colored blobs or dots */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(10,30,70,0.5),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* ── Metro line color strip below nav ── */}
      <div className="absolute top-16 left-0 right-0 flex h-0.5">
        {LINE_COLORS.map((c, i) => (
          <div key={i} className="flex-1 opacity-70" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-28 text-center flex flex-col items-center">

        {/* Class badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/4 text-sm text-slate-400 mb-10 animate-fade-in"
          style={{ animationDelay: "0s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
          MENG 1000 · Design Thinking
        </div>

        {/* Primary heading - Playfair Display */}
        <h1
          className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-none mb-4 animate-fade-in"
          style={{
            fontFamily: "var(--font-playfair)",
            animationDelay: "0.1s",
          }}
        >
          <span className="text-white">Design Thinking</span>
          <br />
          <span className="text-white">Final Prototype</span>
        </h1>

        {/* Sub-heading */}
        <h2
          className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-400 mb-8 tracking-wide animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Madrid Metro Wayfinding System
        </h2>

        {/* Thin divider */}
        <div
          className="w-16 h-px bg-white/20 mb-8 animate-fade-in mx-auto"
          style={{ animationDelay: "0.25s" }}
        />

        {/* Description */}
        <p
          className="text-base sm:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          An improved Madrid Metro navigation prototype using color-coded floor
          paths, clearer signage, accessibility-first routing, and interactive
          route guidance.
        </p>

        {/* Group members */}
        <div
          className="flex flex-wrap gap-2 mb-14 animate-fade-in justify-center"
          style={{ animationDelay: "0.4s" }}
        >
          {MEMBERS.map((name) => (
            <span
              key={name}
              className="px-3.5 py-1 rounded-full border border-white/10 bg-white/4 text-sm text-slate-300"
            >
              {name}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center gap-4 animate-fade-in justify-center"
          style={{ animationDelay: "0.5s" }}
        >
          <Link
            href="/machine"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-900 font-semibold text-sm sm:text-base hover:bg-slate-100 active:scale-95 transition-all duration-200"
          >
            Test the Interactive Machine
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm sm:text-base hover:bg-white/5 hover:border-white/35 active:scale-95 transition-all duration-200"
          >
            View Before and After
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 text-xs select-none">
        <span className="uppercase tracking-widest text-[10px]">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>
    </section>
  );
}
