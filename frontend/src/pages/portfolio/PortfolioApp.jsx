import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import "../../index.css";
import "./portfolio.css";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  {
    index: "001",
    title: "AlgoSEO",
    subtitle: "The Platform That Runs Itself",
    category: "SaaS · Technical SEO",
    year: "2024",
    result: "+1,240%",
    resultLabel: "Organic Growth",
    color: "#00FF94",
    description:
      "Built a fully algorithmic SEO intelligence platform processing 40 million keywords in real-time. Custom crawlers, AI-powered content clustering, live SERP visualisation — the kind of product that replaces a 10-person SEO team.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
  },
  {
    index: "002",
    title: "NovaTech",
    subtitle: "Zero to Category Leader",
    category: "Brand · Web · CRO",
    year: "2024",
    result: "+380%",
    resultLabel: "Conversion Rate",
    color: "#00E5FF",
    description:
      "Series B SaaS startup needed a new digital identity. We rebuilt everything — strategy, design system, conversion architecture. Six weeks from kickoff to a site that consistently outperforms benchmarks.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=85",
  },
  {
    index: "003",
    title: "EcomGrowth",
    subtitle: "The ₹2Cr MRR Flywheel",
    category: "E-Commerce · Paid Media",
    year: "2023",
    result: "6.8×",
    resultLabel: "ROAS",
    color: "#FFB800",
    description:
      "A D2C brand burning budget with no system. We built a unified SEO + paid media flywheel across Google, Meta and YouTube. Nine months later: ₹2Cr monthly recurring — entirely organic + paid synergy.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
  },
  {
    index: "004",
    title: "Stealth Fintech",
    subtitle: "50K Users, Four Months",
    category: "Fintech · SEO · Content",
    year: "2023",
    result: "DA 58",
    resultLabel: "in 4 Months",
    color: "#A855F7",
    description:
      "Took a pre-launch fintech from zero to 50,000 daily active users before their Series A. Pure authority SEO — editorial strategy, HARO, tier-1 publications, and programmatic content at scale.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=85",
  },
  {
    index: "005",
    title: "ContentOS",
    subtitle: "800 Pages. One Engineer.",
    category: "Programmatic SEO",
    year: "2022",
    result: "+920%",
    resultLabel: "Search Traffic",
    color: "#FF4D6D",
    description:
      "Designed and deployed a fully automated programmatic content system — 800+ high-intent pages generated, published, and indexed without human writing. Traffic multiplied in 90 days.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
  },
];

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function Cursor({ hovered }) {
  const outer = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move, { passive: true });
    let raf;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      if (outer.current) {
        const s = hovered ? 64 : 12;
        outer.current.style.transform = `translate(${pos.current.x - s / 2}px,${pos.current.y - s / 2}px)`;
        outer.current.style.width = s + "px";
        outer.current.style.height = s + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, [hovered]);

  return (
    <div
      ref={outer}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        borderRadius: "50%",
        border: hovered ? "1.5px solid rgba(0,255,148,0.9)" : "none",
        background: hovered ? "rgba(0,255,148,0.07)" : "rgba(0,255,148,0.95)",
        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border 0.25s ease, background 0.25s ease",
        mixBlendMode: "difference",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
function Header({ scrolled }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[50]"
      style={{
        padding: "0 48px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,5,10,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
      }}
    >
      <a href="https://seoplanet.in" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: "10px", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", transition: "color 0.3s" }}
          onMouseEnter={e => e.target.style.color = "#00FF94"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
        >
          ← seoplanet.in
        </span>
      </a>

      <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 900, fontSize: "13px", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.9)" }}>
        Our Work
      </span>

      <a href="https://seoplanet.in#contact"
        style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#00FF94", textDecoration: "none", transition: "color 0.3s" }}
        onMouseEnter={e => e.target.style.color = "#fff"}
        onMouseLeave={e => e.target.style.color = "#00FF94"}
      >
        Start a Project →
      </a>
    </header>
  );
}

/* ─────────────────────────────────────────────
   INTRO
───────────────────────────────────────────── */
function Intro({ loaded }) {
  return (
    <section style={{ padding: "180px 48px 80px", maxWidth: "1400px", margin: "0 auto" }}>
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}
      >
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#00FF94", marginBottom: "24px" }}>
          Selected Work · 2022 – 2024
        </div>
        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: 0,
          }}
        >
          {PROJECTS.length} Projects.
          <br />
          <span style={{ color: "#00FF94", textShadow: "0 0 60px rgba(0,255,148,0.35)" }}>
            Real Results.
          </span>
        </h1>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECT ROW — the centrepiece
───────────────────────────────────────────── */
function ProjectRow({ p, isActive, onEnter, onLeave, onClick, revealed }) {
  const rowRef = useRef(null);
  const imageRef = useRef(null);

  // Subtle mouse-parallax on the image
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    imageRef.current.style.transform = `scale(1.12) translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imageRef.current) imageRef.current.style.transform = "scale(1.08) translate(0,0)";
    onLeave();
  }, [onLeave]);

  return (
    <article
      ref={rowRef}
      onMouseEnter={onEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        borderTop: `1px solid rgba(255,255,255,${isActive ? 0.15 : 0.06})`,
        padding: "0 48px",
        cursor: "none",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${p.index * 0.08 - 0.08}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${p.index * 0.08 - 0.08}s, border-color 0.4s ease`,
        maxWidth: "1400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Image reveal panel — slides in from right on hover */}
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "48px",
          width: "42%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
          transition: "clip-path 0.7s cubic-bezier(0.76,0,0.24,1)",
          zIndex: 2,
        }}
      >
        <img
          ref={imageRef}
          src={p.image}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.08) translate(0,0)",
            transition: "transform 0.15s ease-out",
            filter: "brightness(0.6) saturate(1.1)",
          }}
        />
        {/* Color tint */}
        <div style={{ position: "absolute", inset: 0, background: `${p.color}18`, mixBlendMode: "screen" }} />
      </div>

      {/* Text content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px 0",
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* Left: index + title */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "32px", flex: 1 }}>
          <span style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "11px",
            fontWeight: 700,
            color: isActive ? p.color : "rgba(255,255,255,0.2)",
            letterSpacing: "0.2em",
            transition: "color 0.4s ease",
            minWidth: "36px",
          }}>
            {p.index}
          </span>

          <div>
            <h2 style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
              margin: 0,
              transition: "color 0.4s ease",
            }}>
              {p.title}
            </h2>
            <p style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: "8px",
              transition: "color 0.4s ease",
            }}>
              {p.subtitle}
            </p>
          </div>
        </div>

        {/* Right: result + meta */}
        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "24px" }}>
          <div style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
            letterSpacing: "-0.03em",
            color: isActive ? p.color : "rgba(255,255,255,0.15)",
            lineHeight: 1,
            transition: "color 0.4s ease",
          }}>
            {p.result}
          </div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginTop: "6px",
          }}>
            {p.resultLabel}
          </div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.15)",
            marginTop: "4px",
          }}>
            {p.category} · {p.year}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(5,5,10,0.92)",
        backdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "1100px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#080810",
          border: `1px solid ${project.color}30`,
          animation: "slideUp 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
          <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55)" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, #080810 0%, transparent 60%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `${project.color}10` }} />

          {/* Close */}
          <button
            onClick={onClose}
            style={{ position: "absolute", top: "24px", right: "24px", width: "44px", height: "44px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(5,5,10,0.7)", color: "#fff", cursor: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", backdropFilter: "blur(8px)" }}
          >
            ✕
          </button>

          {/* Index */}
          <div style={{ position: "absolute", bottom: "32px", left: "48px" }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.3em", color: project.color, marginBottom: "12px", textTransform: "uppercase" }}>
              {project.index} — {project.category}
            </div>
            <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
              {project.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
              {project.description}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: "48px" }}>
            <div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "8px" }}>{project.resultLabel}</div>
              <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 900, fontSize: "3.5rem", letterSpacing: "-0.03em", color: project.color, lineHeight: 1 }}>{project.result}</div>
            </div>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[["Category", project.category], ["Year", project.year], ["Index", project.index]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{k}</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
            <a
              href="https://seoplanet.in#contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: project.color, textDecoration: "none", cursor: "none" }}
            >
              Work with us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOTTOM CTA
───────────────────────────────────────────── */
function BottomCTA({ revealed }) {
  return (
    <section style={{
      padding: "120px 48px 100px",
      maxWidth: "1400px",
      margin: "0 auto",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#00FF94", marginBottom: "24px" }}>
        Ready to be next?
      </div>
      <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem,7vw,6rem)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 48px" }}>
        Let's Build
        <br />
        <span style={{ color: "#00FF94", textShadow: "0 0 60px rgba(0,255,148,0.4)" }}>Something</span>
        <br />
        Remarkable.
      </h2>
      <a
        href="https://seoplanet.in#contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "18px 40px",
          background: "#00FF94",
          color: "#000",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          textDecoration: "none",
          cursor: "none",
          animation: "pulse-ring 2.6s infinite",
        }}
      >
        Start a Project
        <span style={{ fontSize: "16px" }}>↗</span>
      </a>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function PortfolioApp() {
  const [hovered, setHovered] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [revealedRows, setRevealedRows] = useState(false);
  const [revealedCta, setRevealedCta] = useState(false);
  const rowsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal rows on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealedRows(true); }, { threshold: 0.05 });
    if (rowsRef.current) obs.observe(rowsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealedCta(true); }, { threshold: 0.1 });
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#05050A", color: "#fff", minHeight: "100vh", cursor: "none", overflowX: "hidden" }}>
      <Cursor hovered={hovered || !!modalProject} />
      <Header scrolled={scrolled} />
      <Intro loaded={loaded} />

      {/* Project list */}
      <div ref={rowsRef} style={{ paddingBottom: "0" }}>
        {PROJECTS.map((p) => (
          <ProjectRow
            key={p.index}
            p={p}
            isActive={activeProject === p.index}
            revealed={revealedRows}
            onEnter={() => { setActiveProject(p.index); setHovered(true); }}
            onLeave={() => { setActiveProject(null); setHovered(false); }}
            onClick={() => setModalProject(p)}
          />
        ))}
        {/* Last border */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", maxWidth: "1400px", margin: "0 auto 0", padding: "0 48px" }} />
      </div>

      <div ref={ctaRef}>
        <BottomCTA revealed={revealedCta} />
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          portfolio.seoplanet.in
        </span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          © 2026 SEO Planet
        </span>
      </footer>

      {/* Modal */}
      {modalProject && (
        <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </div>
  );
}
