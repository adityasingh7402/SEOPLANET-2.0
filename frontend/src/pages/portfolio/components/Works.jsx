import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Cello Studio",
    tag: "Design Agency",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
    span: "md:col-span-12" // Featured large project
  },
  {
    title: "Venture Capital",
    tag: "Fintech App",
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    span: "md:col-span-6"
  },
  {
    title: "Nexus Dashboard",
    tag: "SaaS Platform",
    year: "2023",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    span: "md:col-span-6"
  },
  {
    title: "Aura Skincare",
    tag: "E-Commerce",
    year: "2022",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    span: "md:col-span-12"
  }
];

export default function Works() {
  return (
    <section id="works" className="py-20">
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Selected Work</h2>
        <a href="#contact" className="text-sm font-medium hover:text-[#FF8A00] transition-colors pb-1 border-b border-white/20">View all projects</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {projects.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`group block cursor-pointer ${p.span}`}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.03] mb-6">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            <div className="flex items-center justify-between font-medium">
              <div>
                <h3 className="text-xl mb-1">{p.title}</h3>
                <p className="text-sm text-white/50">{p.tag}</p>
              </div>
              <div className="text-sm text-white/40">{p.year}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
