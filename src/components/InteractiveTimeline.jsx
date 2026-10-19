import React, { useState } from "react";
import TiltCard from "./TiltCard";
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from "../data";
import { sound } from "../utils/sound";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle, Sparkles } from "lucide-react";

export default function InteractiveTimeline() {
  const [activeTab, setActiveTab] = useState("experience"); // 'experience' | 'education'

  return (
    <section id="experience" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" /> 04 // Proven Track Record
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Work Experience & <span className="text-gradient-cyan">Credentials</span>
          </h2>
          <p className="mt-2 text-slate-400 max-w-xl text-sm md:text-base font-sans">
            Production engineering experience solving real business challenges in fast-paced software teams.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-slate-900/80 border border-white/10 self-start">
          <button
            onClick={() => {
              setActiveTab("experience");
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "experience"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-neon"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Experience
          </button>
          <button
            onClick={() => {
              setActiveTab("education");
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "education"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-neon"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Education & Certs
          </button>
        </div>
      </div>

      {activeTab === "experience" ? (
        /* Work Experience Timeline */
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/40 before:via-purple-500/30 before:to-transparent">
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="relative z-10">
              <TiltCard
                className="p-6 md:p-8 glass-panel-glow border border-white/10"
                glowColor={idx === 0 ? "cyan" : "violet"}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {exp.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{exp.status}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-300 mt-0.5 font-sans">
                      {exp.company}
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5 md:justify-end text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:justify-end text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      ) : (
        /* Education & Certifications View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Card */}
          <TiltCard className="p-8 glass-panel-glow border border-white/10" glowColor="cyan">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Formal Degree</span>
                <h3 className="text-xl font-bold font-display text-white">B.Tech in Computer Science</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                <div className="text-sm font-semibold text-white">{EDUCATION.school}</div>
                <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>{EDUCATION.location}</span>
                  <span className="text-cyan-400">{EDUCATION.period}</span>
                </div>
                <div className="text-xs text-slate-400 pt-2 border-t border-white/5">
                  {EDUCATION.honors}
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Certifications Card */}
          <TiltCard className="p-8 glass-panel-glow border border-white/10" glowColor="violet">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">Credentials</span>
                <h3 className="text-xl font-bold font-display text-white">Professional Certifications</h3>
              </div>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{cert.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {cert.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                    <span>{cert.issuer}</span>
                    <span className="text-purple-400">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      )}
    </section>
  );
}
