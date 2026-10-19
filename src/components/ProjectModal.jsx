import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { sound } from "../utils/sound";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  Server,
  Globe,
  Cpu,
  CheckCircle,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'architecture' | 'features'

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        sound.playClick();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-2xl transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl md:rounded-3xl glass-panel-glow border border-cyan-500/40 bg-[#060c1c]/98 text-slate-100 shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= FIXED MODAL HEADER ================= */}
        <div className="relative px-6 md:px-8 pt-6 pb-4 border-b border-white/10 bg-[#070f24] shrink-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            {/* Badge & Timeline */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 ${
                  project.badgeColor === "emerald"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/35"
                    : project.badgeColor === "cyan"
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/35"
                    : "bg-purple-500/15 text-purple-400 border border-purple-500/35"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                {project.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Timeline: <strong className="text-slate-300">{project.timeline}</strong>
              </span>
            </div>

            {/* Glowing Close Button with ESC label */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shrink-0"
              title="Close modal (Esc)"
            >
              <span>Close</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400 border border-white/10">
                Esc
              </kbd>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Tagline */}
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="mt-1.5 text-xs md:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
            {project.tagline}
          </p>

          {/* Tab Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-4 mt-5 pt-2 border-t border-white/5 overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab("overview");
                sound.playClick();
              }}
              className={`pb-2.5 font-mono text-xs sm:text-sm font-semibold transition-all relative flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "overview"
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>01 // System Overview</span>
              {activeTab === "overview" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("architecture");
                sound.playClick();
              }}
              className={`pb-2.5 font-mono text-xs sm:text-sm font-semibold transition-all relative flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "architecture"
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>02 // Technical Architecture</span>
              {activeTab === "architecture" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("features");
                sound.playClick();
              }}
              className={`pb-2.5 font-mono text-xs sm:text-sm font-semibold transition-all relative flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === "features"
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>03 // Features & Impact</span>
              {activeTab === "features" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
              )}
            </button>
          </div>
        </div>

        {/* ================= SCROLLABLE CONTENT BODY ================= */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-6 bg-[#040814]/95 text-slate-200">
          {/* TAB 1: SYSTEM OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="p-4 md:p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Executive Summary
                </div>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans">
                  {project.overview}
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div>
                <div className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-3">
                  Production Impact & Telemetry
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center"
                    >
                      <div className="text-xl md:text-2xl font-bold font-mono text-cyan-300 mb-1">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-400 font-sans">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <div className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-3">
                  Core Technologies & Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-cyan-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL ARCHITECTURE */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              {/* Architecture Flow Diagram */}
              <div className="p-5 rounded-2xl bg-[#030610] border border-cyan-500/25">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Data Flow & Pipeline Hierarchy</span>
                  <span className="text-[11px] text-emerald-400 font-normal">
                    SSL Encrypted · Clustered
                  </span>
                </div>

                {/* Pipeline visual blocks */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                    <div className="text-[10px] font-mono text-slate-500 mb-1">01 / CLIENT</div>
                    <div className="text-xs font-bold text-cyan-300">React.js + Redux</div>
                    <div className="text-[11px] text-slate-400 mt-1">Ant Design + Tailwind</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-500/30">
                    <div className="text-[10px] font-mono text-slate-500 mb-1">02 / GATEWAY</div>
                    <div className="text-xs font-bold text-purple-300">Node / Express</div>
                    <div className="text-[11px] text-slate-400 mt-1">REST API + Rate Limiter</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                    <div className="text-[10px] font-mono text-slate-500 mb-1">03 / SECURITY</div>
                    <div className="text-xs font-bold text-emerald-300">JWT & RBAC</div>
                    <div className="text-[11px] text-slate-400 mt-1">7 Role Tiers Guard</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
                    <div className="text-[10px] font-mono text-slate-500 mb-1">04 / STORAGE & REALTIME</div>
                    <div className="text-xs font-bold text-amber-300">MongoDB + AWS S3</div>
                    <div className="text-[11px] text-slate-400 mt-1">Socket.io Clustered</div>
                  </div>
                </div>
              </div>

              {/* Detailed Architecture Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                    <Globe className="w-4 h-4" /> Client Layer
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {project.architecture.client}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Modular atomic React design, custom hooks for optimistic state sync, responsive enterprise data grids, and client-side filtering.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold">
                    <Server className="w-4 h-4" /> API & Authorization
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {project.architecture.api}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Multi-tier hierarchical RBAC middleware, cryptographic token authentication, centralized request sanitization, and structured error responses.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                    <Zap className="w-4 h-4" /> Real-Time Engine
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {project.architecture.realtime}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Low-latency Socket.io room broadcasts for automated business notifications, deals, and cross-team synchronization.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                    <Database className="w-4 h-4" /> Cloud & Data Store
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {project.architecture.storage}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Optimized MongoDB aggregation pipelines, geospatial location queries, and secure AWS S3 multipart media upload buckets.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTION FEATURES */}
          {activeTab === "features" && (
            <div className="space-y-3.5">
              <div className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2">
                Delivered Features & Production Milestones
              </div>
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/70 border border-white/5 flex items-start gap-3.5 hover:border-cyan-500/30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= FIXED MODAL FOOTER ================= */}
        <div className="px-6 md:px-8 py-4 bg-[#070f24] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-400 font-mono">
            Engineering Role: <strong className="text-white">{project.role}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close Blueprint
            </button>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-neon transition-all"
              >
                <span>Launch Live URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Mount directly to document.body via Portal to escape all stacking contexts
  return createPortal(modalContent, document.body);
}
