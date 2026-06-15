import React from "react";
import Hero from "./components/Hero";
import Works from "./components/Works";
import Capabilities from "./components/Capabilities";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { motion } from "framer-motion";

export default function PortfolioApp() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF8A00] selection:text-white">
      {/* Sticky Top Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full flex items-center gap-8 text-sm font-medium">
        <a href="#hero" className="hover:text-white text-white/60 transition-colors">Home</a>
        <a href="#works" className="hover:text-white text-white/60 transition-colors">Work</a>
        <a href="#about" className="hover:text-white text-white/60 transition-colors">About</a>
        <a href="#contact" className="hover:text-white text-white/60 transition-colors">Contact</a>
      </nav>

      {/* Fixed Side Panels */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 text-xs font-medium text-white/40 tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        <a href="mailto:hello@seoplanet.in" className="hover:text-white transition-colors">hello@seoplanet.in</a>
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 text-xs font-medium text-white/40 tracking-widest" style={{ writingMode: 'vertical-rl' }}>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">linkedin.com</a>
      </div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 py-32 space-y-32">
        <Hero />
        <Works />
        <Capabilities />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
