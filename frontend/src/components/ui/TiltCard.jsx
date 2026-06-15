import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function TiltCard({ children, className = "", maxRotation = 12, spotLightColor = "rgba(0, 255, 148, 0.15)" }) {
  const ref = useRef(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 350, damping: 30, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useMotionTemplate`calc((${smoothY} - 0.5) * -${maxRotation * 2}deg)`;
  const rotateY = useMotionTemplate`calc((${smoothX} - 0.5) * ${maxRotation * 2}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: "1200px" }} className={`relative group ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full transform-gpu"
      >
        <div style={{ transformStyle: "preserve-3d" }} className="w-full h-full relative z-10">
          {children}
        </div>

        {/* Interactive Spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen"
          style={{
            background: useMotionTemplate`radial-gradient(circle at calc(${smoothX} * 100%) calc(${smoothY} * 100%), ${spotLightColor} 0%, transparent 60%)`,
          }}
        />

        {/* Dynamic Glowing Border */}
        <motion.div
          className="pointer-events-none absolute -inset-[1px] z-30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(circle at calc(${smoothX} * 100%) calc(${smoothY} * 100%), rgba(255,255,255,0.5) 0%, transparent 40%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
      </motion.div>
    </div>
  );
}
