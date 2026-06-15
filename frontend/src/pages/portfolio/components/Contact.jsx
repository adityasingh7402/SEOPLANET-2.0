import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-32 border-t border-white/10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 mx-auto mb-8">
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-[8vw] font-bold tracking-tighter mb-8">
          Let's Work<br />Together<span className="text-[#FF8A00]">.</span>
        </h2>
        
        <p className="text-white/60 max-w-md mx-auto mb-12">
          Currently taking on new projects for Q3. If you have an exciting idea, let's talk about it.
        </p>

        <a 
          href="mailto:hello@seoplanet.in"
          className="inline-block px-10 py-5 bg-[#FF8A00] text-black font-bold text-lg rounded-full hover:bg-[#ff9d2e] hover:scale-105 transition-all duration-300"
        >
          hello@seoplanet.in
        </a>

        <div className="mt-32 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-white/40 pt-8 border-t border-white/10">
          <p>© {new Date().getFullYear()} SEO Planet. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#top" className="hover:text-white transition-colors">Twitter</a>
            <a href="#top" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#top" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
