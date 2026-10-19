import React, { useState } from "react";
import TiltCard from "./TiltCard";
import { SKILLS, SKILL_CATEGORIES } from "../data";
import { sound } from "../utils/sound";
import { Search, Sparkles, Code2, Server, Database, Shield, Wrench, Layers } from "lucide-react";

export default function InteractiveSkills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Frontend":
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case "Backend":
        return <Server className="w-4 h-4 text-purple-400" />;
      case "Database & Cloud":
        return <Database className="w-4 h-4 text-amber-400" />;
      case "Architecture & Security":
        return <Shield className="w-4 h-4 text-emerald-400" />;
      default:
        return <Wrench className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" /> 02 // Core Competencies
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Engineered For <span className="text-gradient-cyan">High Performance</span>
          </h2>
          <p className="mt-2 text-slate-400 max-w-xl text-sm md:text-base font-sans">
            Production-tested stack spanning full-stack architectures, real-time websockets, and scalable database schemas.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. Socket, JWT)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                sound.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon"
                  : "bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredSkills.map((skill) => (
          <TiltCard
            key={skill.name}
            className="p-5 glass-panel-interactive border border-white/5 flex flex-col justify-between"
            glowColor={
              skill.category === "Architecture & Security"
                ? "emerald"
                : skill.category === "Backend"
                ? "violet"
                : "cyan"
            }
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-white/10">
                  {getCategoryIcon(skill.category)}
                </div>
                <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded">
                  {skill.level}%
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight mb-1 font-display">
                {skill.name}
              </h3>
              <div className="text-[11px] font-mono text-slate-500 mb-3">
                {skill.category} · {skill.experience}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {skill.highlight}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
