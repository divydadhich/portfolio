import React, { useState } from "react";
import TiltCard from "./TiltCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "../data";
import { sound } from "../utils/sound";
import { ExternalLink, Layers, ArrowUpRight, ShieldCheck, Zap, Server, Sparkles, Terminal } from "lucide-react";

export default function FeaturedProjects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" /> 03 // Signature Engineering
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Production Platforms <span className="text-gradient-rainbow">& SaaS Engines</span>
        </h2>
        <p className="mt-2 text-slate-400 max-w-2xl text-sm md:text-base font-sans">
          Real products operating live in production — built with high-throughput MERN architectures, secure RBAC workflows, and real-time sockets.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-12">
        {PROJECTS.map((project, index) => (
          <TiltCard
            key={project.id}
            className="p-6 md:p-10 glass-panel-glow border border-white/10"
            glowColor={project.badgeColor === "emerald" ? "emerald" : project.badgeColor === "violet" ? "violet" : "cyan"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Project Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 ${
                      project.badgeColor === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : project.badgeColor === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {project.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{project.category}</span>
                </div>

                <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
                  {project.tagline}
                </p>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {project.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-center"
                    >
                      <div className="text-base md:text-lg font-bold font-mono text-cyan-400">{m.value}</div>
                      <div className="text-[11px] text-slate-400 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/10 text-slate-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-neon transition-all"
                    >
                      <span>Launch Live URL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveModalProject(project);
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs font-medium border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Inspect Architecture & Specs</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Holographic Preview Graphic */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 border border-white/10 overflow-hidden shadow-2xl group-hover:border-cyan-500/30 transition-colors">
                  {/* Decorative glowing gradient orbs */}
                  <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-cyan-500/20 blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-purple-500/20 blur-3xl" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-mono text-slate-300">Live Architecture Node</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">v3.4 Production</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between">
                        <span className="text-slate-400">Frontend Core:</span>
                        <span className="text-cyan-400 font-medium">React 19 + Redux</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between">
                        <span className="text-slate-400">API Gateway:</span>
                        <span className="text-purple-400 font-medium">Express.js + RBAC</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between">
                        <span className="text-slate-400">Real-Time Sync:</span>
                        <span className="text-emerald-400 font-medium">Socket.io Clustered</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between">
                        <span className="text-slate-400">Database Engine:</span>
                        <span className="text-amber-400 font-medium">MongoDB Atlas + S3</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveModalProject(project);
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>View Technical Blueprint</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Project Deep-Dive Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
