import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    title: "Drama Queens",
    tag: "Campaigns",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
    color: "#E2F0B6" // Light green accent
  },
  {
    title: "Venture Capital",
    tag: "Social Assets",
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    color: "#E1E1E1" 
  },
  {
    title: "Nexus Dash",
    tag: "Slide Decks",
    year: "2023",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    color: "#FF8A00"
  },
  {
    title: "Aura Skincare",
    tag: "E-Commerce",
    year: "2022",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    color: "#FFB0EE" // Pink accent
  },
  {
    title: "Cello Studio",
    tag: "Websites",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    color: "#00FF94"
  },
  {
    title: "Hobby Point",
    tag: "Apps",
    year: "2023",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80",
    color: "#5B6CFF"
  }
];

function CubeCard({ p, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const colIndex = index % 3; // 0: Left, 1: Center, 2: Right

  // Scroll Physics
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  
  // Twist based on column position to reveal spines
  const rotateYRange = 
    colIndex === 0 ? [-35, -5] :  // Left column twists right (shows right spine)
    colIndex === 1 ? [15, -15] :  // Center column wobbles
    [35, 5];                      // Right column twists left (shows left spine)

  const rotateY = useTransform(scrollYProgress, [0, 1], rotateYRange);
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={ref}
      style={{ 
        rotateX, 
        rotateY,
        scale, 
        y,
        transformStyle: "preserve-3d" 
      }}
      className="group relative w-full aspect-[4/5] cursor-pointer"
    >
      {/* 3D Box Construction */}
      
      {/* Back Wall */}
      <div className="absolute inset-0 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)]" />

      {/* Left Spine */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[40px] origin-left border-y border-l border-white/5 flex items-center justify-center overflow-hidden" 
        style={{ transform: "rotateY(-90deg)", backgroundColor: p.color }}
      >
        <span className="text-black font-bold text-xs tracking-widest whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {p.title.toUpperCase()}
        </span>
      </div>

      {/* Right Spine */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-[40px] origin-right border-y border-r border-white/5 flex items-center justify-center overflow-hidden" 
        style={{ transform: "rotateY(90deg)", backgroundColor: p.color }}
      >
        <span className="text-black font-bold text-xs tracking-widest whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          {p.title.toUpperCase()}
        </span>
      </div>

      {/* Top Spine */}
      <div className="absolute top-0 left-0 right-0 h-[40px] bg-[#111] origin-top border-x border-t border-white/5" style={{ transform: "rotateX(90deg)" }} />
      
      {/* Bottom Spine */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-[#0A0A0F] origin-bottom border-x border-b border-white/5" style={{ transform: "rotateX(-90deg)" }} />

      {/* Front Cover */}
      <div 
        className="absolute inset-0 bg-[#111] overflow-hidden border border-white/10" 
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 duration-700 ease-out" />
        <motion.img 
          style={{ y: imageY, scale: 1.25 }}
          src={p.image} 
          alt={p.title} 
          className="w-full h-full object-cover group-hover:scale-[1.3] transition-transform duration-[1.5s] ease-out origin-center"
        />
        
        {/* Front Cover Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-2xl font-bold mb-1" style={{ color: p.color }}>{p.title}</h3>
          <p className="text-sm text-white/80">{p.tag}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Works() {
  return (
    <section id="works" className="py-32" style={{ perspective: "2500px" }}>
      <div className="flex items-end justify-between mb-24">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold tracking-tight"
        >
          Selected Work
        </motion.h2>
        <a href="#contact" className="text-sm font-medium hover:text-[#FF8A00] transition-colors pb-1 border-b border-white/20">View all projects</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-16">
        {projects.map((p, i) => (
          <div key={i} className={i % 3 === 1 ? "xl:mt-24" : i % 3 === 2 ? "xl:mt-12" : ""}>
            <CubeCard p={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
