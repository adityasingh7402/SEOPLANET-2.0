import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;
    let raf;
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(easeOut(t) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 1.0, ease: [0.83, 0, 0.17, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#05050A] flex flex-col items-center justify-center overflow-hidden"
          data-testid="preloader"
        >
          {/* Subtle noise */}
          <div className="absolute inset-0 grain pointer-events-none opacity-50" />

          {/* Minimalist central counter */}
          <div className="relative flex flex-col items-center justify-center z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="font-display font-light text-white text-6xl sm:text-8xl tracking-tighter mb-4 tabular-nums">
                {String(progress).padStart(3, "0")}
              </div>
              <div className="font-mono-pro text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/40">
                SEO PLANET
              </div>
            </motion.div>
          </div>

          {/* Minimal Loading Bar at bottom */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
