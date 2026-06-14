import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Zap, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0C] text-[#FAFAFA] pt-20">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      
      {/* Refined Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00D67D]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#00D67D]" />
          <span className="font-mono-pro text-xs uppercase tracking-[0.2em] text-[#FAFAFA]">Boutique SEO Agency</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8"
        >
          Dominate Search.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Elevate Your Brand.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-pro text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We architect high-performance organic growth strategies for ambitious brands. Data-driven, technically flawless, and completely transparent.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FAFAFA] text-[#0A0A0C] rounded-full font-mono-pro text-sm font-bold uppercase tracking-widest overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">Partner With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </a>
          <a href="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-mono-pro text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Client Portal
          </a>
        </motion.div>

        {/* Premium Value Props */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {[
            { icon: BarChart2, title: "Data-Led Strategy", desc: "No guesswork. Just precision engineering." },
            { icon: Zap, title: "Technical Excellence", desc: "Flawless site architecture and speed." },
            { icon: Shield, title: "Complete Transparency", desc: "Real-time portal access to every metric." }
          ].map((feature, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#00D67D]/10 transition-colors">
                <feature.icon className="w-5 h-5 text-white/50 group-hover:text-[#00D67D] transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
              <p className="font-mono-pro text-sm text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
