import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Loader2, FileText, CheckCircle2, Clock, PlayCircle, TrendingUp, Target, Shield, Link, Activity } from "lucide-react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import TiltCard from "../../components/ui/TiltCard";

function ElegantLoader({ companyName, onComplete }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete(), 2500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C] text-[#FAFAFA]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        <Loader2 className="w-8 h-8 text-[#00D67D] animate-spin mb-6" />
        <p className="font-display text-2xl font-bold mb-2">Preparing your workspace</p>
        <p className="font-mono-pro text-sm text-white/50">{companyName}</p>
      </motion.div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Dashboard() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://seoplanet-2-0.onrender.com/api/onboarding/dashboard");
        setData(res.data.data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
        if (err.response?.status === 401 || err.response?.status === 403) logout();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [logout]);

  if (loading && !data) {
    return <div className="min-h-screen bg-[#0A0A0C]" />;
  }

  if (!data) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0A0A0C] text-[#FAFAFA]">
        <p className="font-mono-pro text-sm text-white/50 mb-4">Session expired.</p>
        <button onClick={logout} className="px-6 py-2 bg-[#00D67D]/10 text-[#00D67D] rounded-lg font-mono-pro text-xs uppercase tracking-wider hover:bg-[#00D67D] hover:text-black transition-colors">
          Return to Login
        </button>
      </div>
    );
  }

  if (data.username === "admin") {
    return <AdminDashboard adminData={data} />;
  }

  return (
    <>
      <AnimatePresence>
        {!showDashboard && <ElegantLoader companyName={data.company_name} onComplete={() => setShowDashboard(true)} />}
      </AnimatePresence>

      {showDashboard && (
        <div className="min-h-screen w-full bg-[#0A0A0C] text-[#FAFAFA] overflow-x-hidden">
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#00D67D]/5 blur-[120px] pointer-events-none" />

          <header className="relative z-10 border-b border-white/5 bg-[#0A0A0C]/80 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold tracking-widest text-sm uppercase">SEO PLANET</span>
                <span className="text-white/20">|</span>
                <span className="font-mono-pro text-xs uppercase tracking-widest text-white/50">Client Portal</span>
              </div>
              <button onClick={logout} className="flex items-center gap-2 text-xs font-mono-pro text-white/50 hover:text-[#00D67D] transition-colors">
                <LogOut className="w-4 h-4" /> Disconnect
              </button>
            </div>
          </header>

          <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-24">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-7 space-y-16">
                <motion.div variants={itemVariants}>
                  <p className="overline-premium text-[#00D67D] mb-4">Performance Overview</p>
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-6">
                    Welcome,<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{data.company_name}</span>
                  </h1>
                  <p className="font-mono-pro text-base text-white/60 leading-relaxed max-w-lg">
                    Your bespoke SEO dashboard. Track real-time performance, review architectural changes, and access your strategy vault below.
                  </p>
                </motion.div>

                {data.metrics && (
                  <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Organic Traffic", value: data.metrics.traffic, icon: TrendingUp },
                      { label: "Top 3 Rankings", value: data.metrics.rankings, icon: Target },
                      { label: "Domain Auth", value: data.metrics.da, icon: Shield },
                      { label: "New Backlinks", value: data.metrics.backlinks, icon: Link }
                    ].map((m, i) => (
                      <TiltCard key={i}>
                        <div className="glass rounded-2xl p-6 border border-white/5 h-full">
                          <m.icon className="w-5 h-5 text-[#00D67D] mb-4 opacity-80" />
                          <p className="font-display font-bold text-2xl mb-1">{m.value}</p>
                          <p className="font-mono-pro text-[10px] uppercase tracking-widest text-white/40">{m.label}</p>
                        </div>
                      </TiltCard>
                    ))}
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <h3 className="overline-premium text-white/40 mb-10 flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-white/20" /> Campaign Architecture
                  </h3>
                  <div className="relative ml-4 space-y-12">
                    <div className="absolute top-2 bottom-2 left-[-1px] w-[1px] bg-gradient-to-b from-white/10 to-transparent" />
                    {data.timeline?.map((item, i) => (
                      <div key={i} className="relative pl-10 group">
                        <div className={`absolute -left-[4.5px] top-2 w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                          item.status === 'completed' ? 'bg-[#00D67D]' :
                          item.status === 'in_progress' ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' :
                          'bg-[#0A0A0C] border border-white/20'
                        }`} />
                        <div className={`flex items-start justify-between gap-4 ${item.status === 'pending' ? 'opacity-40' : ''}`}>
                          <div>
                            <h4 className="font-display text-xl font-bold mb-1">{item.title}</h4>
                            <p className="font-mono-pro text-xs text-white/40 uppercase tracking-widest">Phase {item.step}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {data.recent_activity && data.recent_activity.length > 0 && (
                  <motion.div variants={itemVariants} className="pt-8">
                    <h3 className="overline-premium text-white/40 mb-8 flex items-center gap-3">
                      <div className="w-6 h-[1px] bg-white/20" /> Recent Deliverables
                    </h3>
                    <div className="space-y-4">
                      {data.recent_activity.map((act, i) => (
                        <div key={i} className="flex gap-5 p-5 rounded-2xl glass border border-white/5">
                          <div>
                            <p className="font-mono-pro text-[10px] text-[#00D67D] mb-1.5 uppercase tracking-wider">
                              {new Date(act.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                            <p className="font-display text-base font-medium text-white/90">{act.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-8 lg:pt-32">
                <motion.div variants={itemVariants}>
                  <TiltCard maxRotation={5}>
                    <div className="rounded-3xl glass p-10 border border-white/5 h-full">
                      <h3 className="overline-premium text-[#00D67D] mb-4 flex items-center gap-2"><Target className="w-4 h-4"/> Current Sprint</h3>
                      <p className="font-display text-2xl font-bold leading-tight tracking-tight">
                        {data.current_focus || "Technical Foundation & Audit"}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>

                <motion.div variants={itemVariants} className="rounded-3xl glass p-10 border border-white/5">
                  <h3 className="overline-premium text-white/40 mb-8 flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-white/20" /> Strategy Vault
                  </h3>
                  <div className="space-y-3">
                    {data.documents?.length > 0 ? (
                      data.documents.map((doc, i) => (
                        <a key={i} href={doc.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center text-white/40 group-hover:text-[#00D67D] transition-colors">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-display font-bold text-sm mb-0.5">{doc.title}</p>
                              <p className="font-mono-pro text-[10px] text-white/40 uppercase tracking-wider">PDF Document</p>
                            </div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <p className="text-sm text-white/40 font-mono-pro italic">No documents uploaded.</p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="rounded-3xl p-10 bg-[#00D67D]/5 border border-[#00D67D]/10">
                  <h3 className="overline-premium text-[#00D67D] mb-4">Dedicated Support</h3>
                  <p className="font-mono-pro text-sm text-white/60 leading-relaxed mb-8">
                    Contact your account manager directly to discuss strategic pivots or request assistance.
                  </p>
                  <a href="mailto:founder@seoplanet.in" className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-black rounded-xl font-mono-pro text-xs font-bold uppercase tracking-widest hover:bg-[#00D67D] transition-colors">
                    Contact Team
                  </a>
                </motion.div>
              </div>

            </motion.div>
          </main>
        </div>
      )}
    </>
  );
}
