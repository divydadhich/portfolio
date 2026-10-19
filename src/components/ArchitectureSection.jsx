import React from "react";
import MernPacketSimulator from "./MernPacketSimulator";
import { Sparkles, Cpu, Shield, Zap, Database } from "lucide-react";

export default function ArchitectureSection() {
  return (
    <section id="simulator" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> 01 // Interactive Full-Stack Engine
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Live Backend <span className="text-gradient-cyan">Architecture Simulator</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm md:text-base font-sans">
          Test real-world request pipelines across Divy's production stack — from JWT authentication guards to MongoDB aggregation pipelines and real-time Socket.io channels.
        </p>
      </div>

      {/* Simulator Widget */}
      <MernPacketSimulator />
    </section>
  );
}
