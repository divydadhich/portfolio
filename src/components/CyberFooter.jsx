import React from "react";
import { sound } from "../utils/sound";
import { PROFILE } from "../data";
import { ArrowUp, Mail, Heart, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function CyberFooter() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#02050e] text-slate-400 py-16 px-6 md:px-12 font-sans overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Tagline */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-display font-bold text-lg">
            <span>DIVY DADHICH</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              FULL STACK
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Architecting production MERN platforms, real-time websockets, and scalable web solutions.
          </p>
        </div>

        {/* Social & Contact Links */}
        <div className="flex items-center gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            onClick={() => sound.playClick()}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all cursor-pointer shadow-neon"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
        <div>
          © {new Date().getFullYear()} Divy Dadhich. All production rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span>Bengaluru, Karnataka, India</span>
          <span>•</span>
          <span className="text-emerald-400">Available For Work</span>
        </div>
      </div>
    </footer>
  );
}
