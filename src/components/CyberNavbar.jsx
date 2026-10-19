import React, { useState, useEffect } from "react";
import { sound } from "../utils/sound";
import { Sparkles, Terminal, Volume2, VolumeX, Menu, X, ArrowUpRight, Cpu } from "lucide-react";

export default function CyberNavbar({
  onOpenCommandPalette,
  onTriggerMatrix,
  isSoundMuted,
  onToggleSound,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#hero" },
    { name: "Simulator", href: "#simulator" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top Reading Progress Line */}
      <div
        className="scroll-progress-line"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-3 bg-[#030712]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Status */}
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-display font-black text-white text-lg shadow-neon group-hover:scale-105 transition-transform">
              D
            </div>
            <div>
              <div className="text-sm font-display font-bold text-white tracking-tight flex items-center gap-2">
                <span>DIVY DADHICH</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              </div>
              <div className="text-[10px] font-mono text-cyan-400 tracking-wider">
                MERN ARCHITECT // V3.8
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-md px-3 shadow-inner">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span className="text-cyan-400 mr-1 opacity-70">0{idx + 1}.</span>
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Utilities */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                sound.playClick();
              }}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
              title={isSoundMuted ? "Sound muted" : "Interactive Audio Active"}
            >
              {isSoundMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {/* Quick Command Launcher Pill */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCommandPalette(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Quick Jump</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Contact / Hire Button */}
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-semibold shadow-neon flex items-center gap-1.5 transition-all group"
            >
              <span>Hire Divy</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sound.playClick();
            }}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pt-4 pb-6 bg-[#030712]/95 border-b border-white/10 backdrop-blur-2xl space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="block py-2 text-sm font-mono text-slate-300 hover:text-cyan-400 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleSound();
                  sound.playClick();
                }}
                className="text-xs font-mono text-slate-400 flex items-center gap-2"
              >
                {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                <span>{isSoundMuted ? "Sound Off" : "Sound On"}</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-xs font-mono font-semibold"
              >
                Hire Divy
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
