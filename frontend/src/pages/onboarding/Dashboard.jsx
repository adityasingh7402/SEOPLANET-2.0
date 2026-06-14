import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Loader2, FileText, CheckCircle2, Clock, PlayCircle, TrendingUp, Target, Shield, Link, Activity } from "lucide-react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://seoplanet-2-0.onrender.com/api/onboarding/dashboard");
        setData(res.data.data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#05050A]">
        <Loader2 className="w-8 h-8 text-[#00FF94] animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  if (data.username === "admin") {
    return <AdminDashboard adminData={data} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#05050A] text-white overflow-hidden grain selection:bg-[#00FF94] selection:text-black">
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#00FF94]/5 blur-[120px] pointer-events-none" />

      <header className="relative z-10 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
            <span className="font-display font-bold tracking-wider text-sm">
              SEO PLANET <span className="text-white/30 ml-2">|</span> <span className="ml-2 font-light italic">Portal</span>
            </span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-xs font-mono-pro text-white/50 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 sm:py-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="overline mb-4 text-[#00FF94]">Client Dashboard</p>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tighter leading-tight mb-4">
              Welcome back, <br/>
              <span className="text-white/50">{data.company_name}</span>
            </h1>
            <p className="font-mono-pro text-sm text-white/50 leading-relaxed max-w-lg">
              This is your secure control center. Track your campaign progress in real-time and access all your strategy documentation below.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-12">
            
            {/* Client Metrics */}
            {data.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Organic Traffic", value: data.metrics.traffic, icon: TrendingUp },
                  { label: "Top 3 Rankings", value: data.metrics.rankings, icon: Target },
                  { label: "Domain Auth", value: data.metrics.da, icon: Shield },
                  { label: "New Backlinks", value: data.metrics.backlinks, icon: Link }
                ].map((m, i) => (
                  <div key={i} className="glass rounded-2xl p-5 border border-white/5 hover:border-[#00FF94]/30 transition-colors">
                    <m.icon className="w-5 h-5 text-[#00FF94] mb-3 opacity-80" />
                    <p className="font-display font-bold text-2xl mb-1">{m.value}</p>
                    <p className="font-mono-pro text-[10px] uppercase tracking-wider text-white/40">{m.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Campaign Roadmap */}
            <div>
              <h3 className="overline text-white/40 mb-8">Campaign Roadmap</h3>
              <div className="relative border-l border-white/10 ml-3 space-y-12">
                {data.timeline?.map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${
                      item.status === 'completed' ? 'bg-[#00FF94] shadow-[0_0_10px_#00FF94]' :
                      item.status === 'in_progress' ? 'bg-white shadow-[0_0_10px_white] animate-pulse' :
                      'bg-white/20 border border-white/10'
                    }`} />
                    
                    <div className={`flex items-start justify-between gap-4 ${item.status === 'pending' ? 'opacity-40' : ''}`}>
                      <div>
                        <h4 className="font-display text-lg font-bold mb-1">{item.title}</h4>
                        <p className="font-mono-pro text-xs text-white/40 uppercase tracking-widest">Phase {item.step}</p>
                      </div>
                      <div>
                        {item.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-[#00FF94]" />}
                        {item.status === 'in_progress' && <PlayCircle className="w-5 h-5 text-white" />}
                        {item.status === 'pending' && <Clock className="w-5 h-5 text-white/20" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Deliverables */}
            {data.recent_activity && data.recent_activity.length > 0 && (
              <div className="pt-4">
                <h3 className="overline text-white/40 mb-6 flex items-center gap-2"><Activity className="w-4 h-4" /> Recent Deliverables</h3>
                <div className="space-y-4">
                  {data.recent_activity.map((act, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#00FF94] mt-1.5 shadow-[0_0_10px_#00FF94]" />
                      <div>
                        <p className="font-mono-pro text-[10px] text-white/40 mb-1">
                          {new Date(act.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="font-display text-sm text-white/90">{act.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-8">
          {/* Sprint Focus */}
          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.3}} className="rounded-2xl glass p-8 border border-[#00FF94]/20 bg-[#00FF94]/5">
            <h3 className="overline text-[#00FF94] mb-4 flex items-center gap-2"><Target className="w-4 h-4"/> Current Sprint Focus</h3>
            <p className="font-display text-xl font-medium leading-relaxed tracking-tight">{data.current_focus || "Phase 1: Technical Foundation & Site Architecture"}</p>
          </motion.div>

          {/* Vault */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="rounded-2xl glass p-8 border border-white/5">
            <h3 className="overline text-white/40 mb-6">Strategy Vault</h3>
            <div className="space-y-4">
              {data.documents?.length > 0 ? (
                data.documents.map((doc, i) => (
                  <a key={i} href={doc.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#00FF94]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center text-[#00FF94]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-sm mb-0.5 group-hover:text-[#00FF94] transition-colors">{doc.title}</p>
                        <p className="font-mono-pro text-[10px] text-white/40 uppercase tracking-wider">PDF Document</p>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-sm text-white/40 font-mono-pro italic">No documents uploaded yet.</p>
              )}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="rounded-2xl p-8 border border-[#00FF94]/20 bg-[#00FF94]/5">
            <div className="flex items-start justify-between mb-4">
              <h3 className="overline text-[#00FF94] mb-2">Dedicated Support</h3>
              <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
            </div>
            <p className="font-mono-pro text-sm text-white/70 leading-relaxed mb-6">
              Need assistance or want to request a strategy pivot? Open a direct comms channel with your account manager.
            </p>
            <a href="mailto:founder@seoplanet.in" className="inline-flex items-center justify-center w-full gap-2 rounded-full bg-white text-black px-6 py-3 font-mono-pro text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#00FF94] transition-colors">
              Contact Team
            </a>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
