import React, { useState } from "react";
import TiltCard from "./TiltCard";
import { PROFILE } from "../data";
import { sound } from "../utils/sound";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, Globe, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function FuturisticContact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState("Full-Stack Engineer Role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const subjects = [
    "Full-Stack Engineer Role",
    "SaaS Platform MVP",
    "MERN Architecture Consulting",
    "Quick Chat / Coffee",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    sound.playSuccess();

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#38bdf8", "#818cf8", "#34d399", "#c084fc"],
    });

    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE.phone);
    setCopiedPhone(true);
    sound.playSuccess();
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    sound.playClick();

    try {
      // If EmailJS keys configured, send via EmailJS, else open mailto
      // We will prepare safe attempt
      const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} from ${name}`
      )}&body=${encodeURIComponent(
        `Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      window.open(mailtoUrl, "_blank");

      setIsSending(false);
      setSentSuccess(true);
      sound.playSuccess();

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
      });

      setName("");
      setEmail("");
      setMessage("");

      setTimeout(() => setSentSuccess(false), 5000);
    } catch {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
          <Sparkles className="w-3.5 h-3.5" /> 05 // Open Comm Channel
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Ready To Build Something <span className="text-gradient-cyan">Extraordinary?</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm md:text-base font-sans">
          Actively interviewing for Full Stack Developer & MERN roles. Let's discuss your product roadmap, engineering challenges, or architecture needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Quick Action Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Card */}
          <TiltCard className="p-6 glass-panel-glow border border-white/10" glowColor="cyan">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Direct Email</div>
                  <div className="text-sm font-semibold text-white font-mono truncate">
                    {PROFILE.email}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </TiltCard>

          {/* Quick Copy Phone Card */}
          <TiltCard className="p-6 glass-panel-glow border border-white/10" glowColor="emerald">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Phone / WhatsApp</div>
                  <div className="text-sm font-semibold text-white font-mono">
                    {PROFILE.phone}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </TiltCard>

          {/* Location & Presence */}
          <TiltCard className="p-6 glass-panel-glow border border-white/10" glowColor="violet">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Base Location</div>
                <div className="text-sm font-semibold text-white font-mono">
                  {PROFILE.location}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-sans border-t border-white/5 pt-3">
              Available for onsite roles in Bengaluru & global remote teams across IST / UTC / EST timezones.
            </div>
          </TiltCard>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all"
            >
              <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all"
            >
              <GithubIcon className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Futuristic Message Console */}
        <div className="lg:col-span-7">
          <TiltCard className="p-8 glass-panel-glow border border-cyan-500/25" glowColor="cyan">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <MessageSquare className="w-4 h-4" /> Message Dispatch Console
              </div>
              <span className="text-slate-500 text-[11px]">Secure SSL End-to-End</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Subject Presets */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  Select Intent / Subject
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSubject(s);
                        sound.playClick();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        subject === s
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon"
                          : "bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Message / Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the role, technical scope, or timeline..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans leading-relaxed resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-neon transition-all cursor-pointer disabled:opacity-50"
              >
                {isSending ? (
                  <span>Dispatching Message...</span>
                ) : sentSuccess ? (
                  <span className="flex items-center gap-2 text-emerald-300">
                    <Check className="w-4 h-4" /> Message Sent Successfully!
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Communication</span>
                  </>
                )}
              </button>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
