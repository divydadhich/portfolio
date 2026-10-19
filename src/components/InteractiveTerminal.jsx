import React, { useState, useRef, useEffect } from "react";
import { sound } from "../utils/sound";
import { Terminal as TermIcon, Activity, Sparkles, Copy, Check, CornerDownLeft, RefreshCw } from "lucide-react";
import { TERMINAL_COMMANDS } from "../data";

export default function InteractiveTerminal({ onTriggerMatrix }) {
  const [activeTab, setActiveTab] = useState("terminal"); // 'terminal' | 'health' | 'specs'
  const [history, setHistory] = useState([
    { type: "system", text: "Divy CyberOS v3.8.4 [MERN Production Kernel initialized]" },
    { type: "system", text: "Connected to production node in Bengaluru, IN. Type 'help' for commands." },
    { type: "command", text: "whoami" },
    { type: "output", text: TERMINAL_COMMANDS.whoami },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sound.playClick();

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (trimmed === "matrix") {
      setHistory((prev) => [
        ...prev,
        { type: "command", text: cmd },
        { type: "output", text: ">> Matrix code stream initiated. Look around you..." },
      ]);
      setInputVal("");
      if (onTriggerMatrix) onTriggerMatrix();
      return;
    }

    const output = TERMINAL_COMMANDS[trimmed] || `Command not found: '${trimmed}'. Type 'help' for available commands.`;

    setHistory((prev) => [
      ...prev,
      { type: "command", text: cmd },
      { type: "output", text: output },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    sound.playKeypress();
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  const copyHistory = () => {
    const text = history.map((h) => (h.type === "command" ? `$ ${h.text}` : h.text)).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const chips = ["skills", "projects", "stats", "xoto", "hire", "matrix", "clear"];

  return (
    <div className="rounded-2xl glass-panel border border-cyan-500/25 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab("terminal");
                sound.playClick();
              }}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "terminal" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <TermIcon className="w-3 h-3" /> cyber_shell.sh
            </button>
            <button
              onClick={() => {
                setActiveTab("health");
                sound.playClick();
              }}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "health" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <Activity className="w-3 h-3 text-emerald-400" /> live_telemetry
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyHistory}
            className="p-1.5 text-slate-400 hover:text-cyan-300 rounded transition-colors"
            title="Copy Terminal Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => handleCommand("clear")}
            className="p-1.5 text-slate-400 hover:text-cyan-300 rounded transition-colors"
            title="Reset Terminal"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      {activeTab === "terminal" ? (
        <div className="p-5 bg-[#030816]/95 min-h-[310px] max-h-[380px] overflow-y-auto flex flex-col justify-between">
          <div className="space-y-2 mb-4">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === "command" ? (
                  <div className="text-cyan-300 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span>{item.text}</span>
                  </div>
                ) : item.type === "system" ? (
                  <div className="text-slate-500 italic text-[11px]">{item.text}</div>
                ) : (
                  <div className="text-slate-300 pl-4 border-l border-cyan-500/30 py-0.5 whitespace-pre-line text-xs font-sans">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div>
            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3 pt-3 border-t border-white/5">
              <span className="text-[10px] text-slate-500 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Quick Run:
              </span>
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleCommand(chip)}
                  className="px-2 py-0.5 rounded text-[11px] bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/40 transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 bg-slate-900/60 rounded-lg px-3 py-2 border border-cyan-500/20 focus-within:border-cyan-400">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command (e.g. skills, xoto, stats) or click chips above..."
                className="w-full bg-transparent text-cyan-200 placeholder-slate-600 focus:outline-none text-xs"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="text-slate-400 hover:text-cyan-300 p-1"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Live Telemetry View */
        <div className="p-6 bg-[#030816]/95 min-h-[310px] grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-cyan-500/20 flex flex-col justify-between">
            <span className="text-slate-400 text-xs">Production Dashboards</span>
            <span className="text-3xl font-bold text-cyan-400">7+ Tiers</span>
            <span className="text-[11px] text-slate-500">Admin, Agent, Advisor, Agency, Developer, Partner, Customer</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/20 flex flex-col justify-between">
            <span className="text-slate-400 text-xs">Cron Automation Engine</span>
            <span className="text-3xl font-bold text-emerald-400">15+ Events</span>
            <span className="text-[11px] text-slate-500">Autonomous business triggers & Socket notifications</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-purple-500/20 flex flex-col justify-between">
            <span className="text-slate-400 text-xs">Component Acceleration</span>
            <span className="text-3xl font-bold text-purple-400">30% Faster</span>
            <span className="text-[11px] text-slate-500">Standardized React & Ant Design architectural modules</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-amber-500/20 flex flex-col justify-between">
            <span className="text-slate-400 text-xs">API Health & Availability</span>
            <span className="text-3xl font-bold text-amber-400">99.98%</span>
            <span className="text-[11px] text-slate-500">Production REST endpoints with zero-downtime shipping</span>
          </div>
        </div>
      )}
    </div>
  );
}
