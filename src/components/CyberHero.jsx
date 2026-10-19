import React, { useState, useEffect } from "react";
import InteractiveTerminal from "./InteractiveTerminal";
import TiltCard from "./TiltCard";
import { PROFILE, SYSTEM_METRICS } from "../data";
import { sound } from "../utils/sound";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Mail,
  Copy,
  Check,
  LayoutDashboard,
  Zap,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function CyberHero({ onTriggerMatrix }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full Stack MERN Architect",
    "Production SaaS Platform Engineer",
    "Real-Time Sockets & RBAC Specialist",
    "Scalable API & Cloud Builder",
  ];

  // Realistic typewriter effect for role headline
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    sound.playSuccess();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Background cyber ambient glow */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Bio & Primary CTAs */}
        <div className="lg:col-span-7 space-y-7">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wider">AVAILABLE FOR ELITE FULL-STACK ROLES</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{PROFILE.location}</span>
          </div>

          {/* Main Title & Dynamic Role */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              ENGINEERING <br />
              <span className="text-gradient-rainbow">HIGH-IMPACT</span> <br />
              WEB PLATFORMS.
            </h1>

            {/* Typewriter Subheading */}
            <div className="flex items-center gap-2 text-lg sm:text-2xl font-mono text-cyan-300 font-semibold min-h-[36px]">
              <span className="text-emerald-400">&gt;</span>
              <span>{displayText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 animate-pulse inline-block" />
            </div>
          </div>

          {/* Summary / Hook */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans">
            Hi, I'm <strong className="text-white">{PROFILE.name}</strong>. I architect production MERN systems and enterprise SaaS applications — owning features end-to-end with React.js, Node.js, Express, MongoDB, JWT, RBAC, Socket.io, and AWS S3.
          </p>

          {/* Action Button Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#simulator"
              onClick={() => sound.playClick()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono text-xs font-semibold shadow-neon flex items-center gap-2 transition-all cursor-pointer group"
            >
              <Cpu className="w-4 h-4 text-cyan-200" />
              <span>Launch Architecture Flow</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#projects"
              onClick={() => sound.playClick()}
              className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs font-medium border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-2"
            >
              <span>Explore Projects (XOTO.ae)</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 font-mono text-xs border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
              title="Copy direct email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Marquee Tool Badges */}
          <div className="pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-2.5">
              Production Verified Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "React 19",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Socket.io",
                "AWS S3",
                "RBAC Security",
                "JWT Auth",
                "Redux Toolkit",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/5 text-slate-400 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Cyber Shell Terminal */}
        <div className="lg:col-span-5">
          <InteractiveTerminal onTriggerMatrix={onTriggerMatrix} />
        </div>
      </div>

      {/* Live System Stats HUD Cards */}
      <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SYSTEM_METRICS.map((metric, idx) => (
          <TiltCard
            key={idx}
            className="p-5 glass-panel-glow border border-white/10 flex flex-col justify-between"
            glowColor={idx % 2 === 0 ? "cyan" : "violet"}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">{metric.label}</span>
                {idx === 0 && <LayoutDashboard className="w-4 h-4 text-cyan-400" />}
                {idx === 1 && <Zap className="w-4 h-4 text-emerald-400" />}
                {idx === 2 && <TrendingUp className="w-4 h-4 text-purple-400" />}
                {idx === 3 && <ShieldCheck className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="text-3xl font-display font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-slate-400 font-sans">{metric.detail}</div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
