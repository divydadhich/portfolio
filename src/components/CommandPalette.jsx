import React, { useState, useEffect } from "react";
import { sound } from "../utils/sound";
import confetti from "canvas-confetti";
import {
  Search,
  X,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Briefcase,
  Mail,
  Volume2,
  VolumeX,
  Code,
} from "lucide-react";
import { PROFILE } from "../data";

export default function CommandPalette({
  isOpen,
  onClose,
  onTriggerMatrix,
  isSoundMuted,
  onToggleSound,
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "simulator",
      name: "Test MERN Architecture Flow",
      category: "Interactive",
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      run: () => {
        document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "projects",
      name: "Inspect XOTO.ae & Vani Projects",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      run: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "skills",
      name: "View Full-Stack Skills & Competencies",
      category: "Navigation",
      icon: <Code className="w-4 h-4 text-emerald-400" />,
      run: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "experience",
      name: "View Kotibox Work Experience",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      run: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "matrix",
      name: "Engage Matrix Digital Rain (Easter Egg)",
      category: "Experience",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      run: () => {
        if (onTriggerMatrix) onTriggerMatrix();
      },
    },
    {
      id: "sound",
      name: isSoundMuted ? "Unmute Audio FX Synthesizer" : "Mute Audio FX Synthesizer",
      category: "Settings",
      icon: isSoundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />,
      run: () => {
        if (onToggleSound) onToggleSound();
      },
    },
    {
      id: "email",
      name: "Copy Direct Email (divydadhich1234@gmail.com)",
      category: "Contact",
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      run: () => {
        navigator.clipboard.writeText(PROFILE.email);
        sound.playSuccess();
        confetti({ particleCount: 50, spread: 60 });
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl glass-panel-glow border border-cyan-500/30 bg-[#091024]/95 text-slate-100 shadow-2xl overflow-hidden animate-fadeIn">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-4 h-4 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or navigate anywhere (Esc to exit)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={() => onClose(false)}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                item.run();
                onClose(false);
              }}
              className="w-full p-3 rounded-xl flex items-center justify-between text-left hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-white/5 group-hover:border-cyan-500/30">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-300 font-sans">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{item.category}</div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-600 group-hover:text-cyan-400">
                Execute ↵
              </span>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="p-6 text-center text-xs font-mono text-slate-500">
              No matching command found.
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigation Quick-Launcher</span>
          <div className="flex items-center gap-2">
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
