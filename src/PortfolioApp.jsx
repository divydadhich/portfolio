import { useEffect, useRef, useState, useCallback, useMemo} from "react";
import {
  PROFILE,
  BOOT_LINES,
  SYSTEM_STATS,
  TOOL_LIST,
  SKILLS,
  SKILL_CATEGORIES,
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
  CERTIFICATIONS,
} from "./data";

/* ----------------------------------------------------------------------- */
/*  Theme: "Live Systems Console" — dark engineering-console aesthetic     */
/*  built around the actual shape of Divy's work: RBAC dashboards, cron   */
/*  notifications, real-time sockets. Space Grotesk for display type,     */
/*  IBM Plex Mono for data/labels. Emerald = live/online, amber = signal. */
/* ----------------------------------------------------------------------- */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

    :root {
      --bg: #f4f6f8;
      --panel: #ffffff;
      --panel-hi: #eef2f6;
      --border: #dde3ea;
      --border-hi: #c2ccd6;
      --text: #10151c;
      --muted: #5b6b7c;
      --emerald: #0e9f6e;
      --amber: #c77d0a;
      --blue: #2563eb;
      /* the terminal window and cursor stay dark for contrast against the light page */
      --term-bg: #0b1220;
      --term-panel-hi: #101a2c;
      --term-border: #223046;
      --term-text: #e7ecf3;
      --term-muted: #8291a3;
    }

    .console-root {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', system-ui, sans-serif;
    }
    .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
    .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
    }

    ::selection { background: rgba(52, 211, 153, 0.28); color: #fff; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 8px; }

    /* Progress bar */
    .progress-bar {
      position: fixed; top: 0; left: 0; height: 2px; z-index: 60;
      background: linear-gradient(90deg, var(--emerald), var(--blue));
      box-shadow: 0 0 12px rgba(14,159,110,0.45);
      transition: width 0.08s linear;
    }

    /* Custom cursor */
    .cursor-dot {
      position: fixed; width: 7px; height: 7px; border-radius: 999px;
      background: var(--emerald); pointer-events: none; z-index: 100;
      transform: translate(-50%,-50%); transition: transform 0.12s ease, background 0.2s ease;
      box-shadow: 0 0 10px rgba(14,159,110,0.7);
    }
    .cursor-ring {
      position: fixed; width: 34px; height: 34px; border-radius: 999px;
      border: 1px solid rgba(16,21,28,0.28); pointer-events: none; z-index: 99;
      transform: translate(-50%,-50%); transition: transform 0.18s ease, border-color 0.2s ease, width .2s ease, height .2s ease;
    }
    .cursor-ring.hover { border-color: var(--emerald); width: 52px; height: 52px; }

    /* Scanline / grid background */
    .grid-field {
      position: absolute; inset: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(16,21,28,0.055) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16,21,28,0.055) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 85%);
    }
    .scanline {
      position: absolute; inset: 0; pointer-events: none; opacity: 0.4;
      background: repeating-linear-gradient(0deg, rgba(16,21,28,0.012) 0px, rgba(16,21,28,0.012) 1px, transparent 1px, transparent 3px);
    }

    /* Blinking cursor for terminal */
    .blink-caret { animation: blink 1s steps(1) infinite; }
    @keyframes blink { 50% { opacity: 0; } }

    /* Boot line reveal */
    .boot-line { animation: bootIn 0.3s ease both; }
    @keyframes bootIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }

    /* Headline char stagger */
    .char-in { display: inline-block; opacity: 0; transform: translateY(0.5em); animation: charIn 0.6s cubic-bezier(.2,.7,.2,1) forwards; }
    @keyframes charIn { to { opacity: 1; transform: translateY(0); } }

    /* Reveal on scroll */
    .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.2,.7,.2,1); }
    .reveal.in { opacity: 1; transform: translateY(0); }

    /* Live pulse dot */
    .pulse-dot { position: relative; }
    .pulse-dot::before {
      content: ''; position: absolute; inset: -4px; border-radius: 999px;
      background: currentColor; opacity: 0.5; animation: pulseRing 1.8s ease-out infinite;
    }
    @keyframes pulseRing { 0% { transform: scale(0.6); opacity: 0.55; } 100% { transform: scale(2.2); opacity: 0; } }

    /* Marquee */
    .marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
    .marquee-track:hover { animation-play-state: paused; }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* Timeline draw line */
    .timeline-line { transform-origin: top; transform: scaleY(0); transition: transform 1.1s cubic-bezier(.2,.7,.2,1); }
    .timeline-line.in { transform: scaleY(1); }

    /* Card hover lift + border glow */
    .console-card { transition: transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.35s ease, box-shadow 0.35s ease; }
    .console-card:hover { transform: translateY(-4px); border-color: var(--border-hi); box-shadow: 0 24px 60px rgba(0,0,0,0.45); }

    /* Spotlight follows cursor within a card via CSS var --mx/--my set in JS */
    .spotlight { position: relative; overflow: hidden; }
    .spotlight::after {
      content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0;
      background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(52,211,153,0.12), transparent 60%);
      transition: opacity 0.3s ease;
    }
    .spotlight:hover::after { opacity: 1; }

    /* Magnetic button wrapper handled via inline transform in JS */
    .btn-primary {
      background: var(--emerald); color: #04140d; font-weight: 600;
      transition: transform 0.2s cubic-bezier(.2,.7,.2,1), box-shadow 0.2s ease, background 0.2s ease;
      box-shadow: 0 0 0 rgba(52,211,153,0);
    }
    .btn-primary:hover { box-shadow: 0 8px 30px rgba(52,211,153,0.35); }

    .tag-chip { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.02em; }

    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
      background: var(--emerald); transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
    }
    .nav-link:hover::after { transform: scaleX(1); }

    .status-current { color: var(--emerald); }
    .status-past { color: var(--muted); }

    /* Avatar / blob / orbiting chips */
    .blob-shape {
      animation: blobMorph 9s ease-in-out infinite, blobSpin 22s linear infinite;
      background: linear-gradient(135deg, rgba(14,159,110,0.18), rgba(37,99,235,0.16));
    }
    @keyframes blobMorph {
      0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; }
      33% { border-radius: 60% 40% 45% 55% / 55% 60% 40% 45%; }
      66% { border-radius: 48% 52% 38% 62% / 62% 45% 55% 38%; }
    }
    @keyframes blobSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .avatar-float { animation: avatarFloat 5s ease-in-out infinite; }
    @keyframes avatarFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

    .wave-hand { transform-origin: 78% 78%; animation: wave 2.4s ease-in-out infinite; animation-delay: 1s; }
    @keyframes wave {
      0%, 60%, 100% { transform: rotate(0deg); }
      10% { transform: rotate(16deg); } 20% { transform: rotate(-8deg); } 30% { transform: rotate(16deg); } 40% { transform: rotate(-4deg); } 50% { transform: rotate(10deg); }
    }

    .orbit-chip { animation: orbitFloat 4.5s ease-in-out infinite; }
    @keyframes orbitFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(-4deg); } }
  `}</style>
);

/* ----------------------------- utility hooks ---------------------------- */

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const full = document.body.scrollHeight - window.innerHeight;
      setProgress(full > 0 ? (top / full) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, inView, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

/* --------------------------------- cursor -------------------------------- */

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const ring = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf;

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (e.target.closest?.("a, button, input, textarea, select, [data-cursor-hover]")) setHover(true);
      else setHover(false);
    };

    const animateRing = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`;
        ringRef.current.style.top = `${ring.y}px`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(animateRing);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className={`cursor-ring hidden md:block ${hover ? "hover" : ""}`} />
    </>
  );
}

/* ------------------------------ background fx ---------------------------- */

function AmbientField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes = Array.from({ length: 46 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }));

    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((n, i) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = n.x - other.x, dy = n.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(14, 159, 110, ${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(other.x, other.y); ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.4)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
      <div className="grid-field" />
      <div className="scanline" />
    </div>
  );
}

/* --------------------------------- navbar -------------------------------- */

function Navbar({ progress }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--panel)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 24px rgba(16,21,28,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          <button onClick={() => scrollTo("Home")} className="font-mono text-sm text-[var(--text)] flex items-center gap-2">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--emerald)] text-[var(--emerald)]" />
            divy@console
          </button>
          <nav className="hidden items-center gap-8 md:flex font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {links.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="nav-link hover:text-[var(--text)] transition-colors">{l}</button>
            ))}
          </nav>
          <a href={`mailto:${PROFILE.email}`} className="hidden md:inline-flex btn-primary rounded-md px-4 py-2 text-xs font-mono">
            get_in_touch()
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden rounded-md border border-[var(--border)] px-3 py-2 font-mono text-xs text-[var(--text)]">
            {open ? "close" : "menu"}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-[var(--border)] px-6 py-5" style={{ background: "var(--panel)" }}>
            <div className="flex flex-col gap-4 font-mono text-sm text-[var(--muted)]">
              {links.map((l) => <button key={l} onClick={() => scrollTo(l)} className="text-left hover:text-[var(--text)]">{l}</button>)}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function BootTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) return;
    const line = BOOT_LINES[visibleLines];
    if (charCount < line.prompt.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setVisibleLines((v) => v + 1); setCharCount(0); }, 420);
    return () => clearTimeout(t);
  }, [charCount, visibleLines]);

  return (
    <div className="rounded-xl border overflow-hidden shadow-xl shadow-slate-900/10" style={{ background: "var(--term-bg)", borderColor: "var(--term-border)" }}>
      <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "var(--term-border)" }}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef5a5a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--amber)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--emerald)]" />
        <span className="ml-2 font-mono text-[11px]" style={{ color: "var(--term-muted)" }}>divy — zsh</span>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-7 min-h-[168px]">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="boot-line">
            <span className="text-[var(--emerald)]">➜ </span>
            <span style={{ color: "var(--term-text)" }}>{line.prompt}</span>
            <div className="pl-4" style={{ color: "var(--term-muted)" }}>{line.output}</div>
          </div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <div>
            <span className="text-[var(--emerald)]">➜ </span>
            <span style={{ color: "var(--term-text)" }}>{BOOT_LINES[visibleLines].prompt.slice(0, charCount)}</span>
            <span className="blink-caret text-[var(--emerald)]">▍</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AvatarIllustration() {
  const wrapRef = useRef(null);
  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
    el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };
  const onLeave = () => { if (wrapRef.current) wrapRef.current.style.transform = ""; };

  // Floating particles data
  const particles = Array.from({ length: 12 }, (_, i) => ({
    left: `${10 + (i * 7) % 80}%`,
    top: `${10 + (i * 13) % 80}%`,
    delay: `${i * 0.4}s`,
    size: 2 + (i % 3),
  }));

  // Orbiting chips with icons and colors
  const chips = [
    { symbol: "</>", color: "var(--emerald)", top: "5%", left: "70%", delay: "0s" },
    { symbol: "{ }", color: "var(--blue)", top: "68%", left: "-3%", delay: "0.7s" },
    { symbol: "λ", color: "var(--amber)", top: "16%", left: "-8%", delay: "1.4s" },
    { symbol: "⌘", color: "var(--emerald)", top: "78%", left: "82%", delay: "0.3s" },
    { symbol: "⚡", color: "var(--amber)", top: "45%", left: "92%", delay: "1.1s" },
  ];

  return (
    <div className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center sm:h-[360px] sm:w-[360px]">
      {/* Ambient glow behind everything */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,159,110,0.12) 0%, rgba(37,99,235,0.06) 40%, transparent 70%)",
          animation: "glowPulse 4s ease-in-out infinite",
        }}
      />

      {/* Morphing blob background */}
      <div className="blob-shape absolute inset-2" />

      {/* Rotating dashed tech ring */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="160"
          cy="160"
          r="150"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          style={{
            animation: "rotateRing 20s linear infinite",
            transformOrigin: "center",
          }}
        />
        <circle
          cx="160"
          cy="160"
          r="140"
          stroke="var(--emerald)"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.4"
          style={{
            animation: "rotateRing 30s linear infinite reverse",
            transformOrigin: "center",
          }}
        />
      </svg>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: i % 2 === 0 ? "var(--emerald)" : "var(--blue)",
            opacity: 0.5,
            animation: `floatParticle ${3 + (i % 5)}s ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Orbiting tech chips */}
      {chips.map((chip) => (
        <span
          key={chip.symbol}
          className="orbit-chip absolute rounded-full border font-mono text-xs shadow-sm"
          style={{
            background: "var(--panel)",
            borderColor: "var(--border)",
            color: chip.color,
            padding: "6px 10px",
            top: chip.top,
            left: chip.left,
            animationDelay: chip.delay,
          }}
        >
          {chip.symbol}
        </span>
      ))}

      {/* Main avatar with 3D tilt */}
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="avatar-float relative"
        style={{ transition: "transform 0.25s ease", transformStyle: "preserve-3d" }}
      >
        {/* Dynamic shadow that moves with tilt */}
        <div
          className="absolute -bottom-6 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-black/10 blur-md"
          style={{ transition: "transform 0.25s ease" }}
        />

        <svg width="250" height="250" viewBox="0 0 230 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Illustrated avatar of Divy">
          <defs>
            <radialGradient id="skinGrad2" cx="42%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#f8d8a8" />
              <stop offset="100%" stopColor="#eeb87c" />
            </radialGradient>
            <linearGradient id="hoodieGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b74f0" />
              <stop offset="100%" stopColor="#1e4fc4" />
            </linearGradient>
            <linearGradient id="hairGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2b2f36" />
              <stop offset="100%" stopColor="#181b20" />
            </linearGradient>
            <linearGradient id="lensGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dfe9f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#dfe9f7" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <circle cx="115" cy="115" r="112" fill="var(--panel)" stroke="var(--border)" strokeWidth="2" />

          {/* soft ground shadow */}
          <ellipse cx="115" cy="224" rx="52" ry="6" fill="#000" opacity="0.06" />

          {/* shoulders / hoodie body with tech circuit lines */}
          <path d="M58 226C61 176 88 154 115 154C142 154 169 176 172 226" fill="url(#hoodieGrad2)" />
          {/* Circuit pattern on hoodie */}
          <path d="M90 190 L95 185 L100 190 L105 185" stroke="#7aa5ff" strokeWidth="1.5" opacity="0.6" fill="none" />
          <path d="M125 195 L130 190 L135 195 L140 190" stroke="#7aa5ff" strokeWidth="1.5" opacity="0.6" fill="none" />
          <circle cx="105" cy="185" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="140" cy="190" r="1.5" fill="#fff" opacity="0.8" />

          {/* hood seam + drawstrings */}
          <path d="M97 166L101 192L115 200L129 192L133 166" fill="#173f9e" opacity="0.45" />
          <path d="M108 178 q1 10 -1 22" stroke="#0f2f7a" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M122 178 q-1 10 1 22" stroke="#0f2f7a" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <circle cx="107" cy="201" r="2.4" fill="#e7ecf3" />
          <circle cx="123" cy="201" r="2.4" fill="#e7ecf3" />

          {/* neck */}
          <rect x="102" y="138" width="26" height="28" rx="11" fill="url(#skinGrad2)" />
          <path d="M102 152 h26" stroke="#d99f6b" strokeWidth="2" opacity="0.4" />

          {/* head */}
          <ellipse cx="115" cy="104" rx="55" ry="59" fill="url(#skinGrad2)" />

          {/* ears */}
          <circle cx="60" cy="107" r="9" fill="url(#skinGrad2)" />
          <circle cx="170" cy="107" r="9" fill="url(#skinGrad2)" />

          {/* hair with subtle shine */}
          <path d="M58 98C53 58 82 36 115 36C148 36 177 58 172 98C171 78 160 92 152 80C150 98 130 74 118 88C104 72 86 100 82 88C78 100 60 88 58 98Z" fill="url(#hairGrad2)" />
          <path d="M66 70 q6 -14 20 -18" stroke="#3a3f47" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
          <path d="M148 66 q10 -10 20 -8" stroke="#3a3f47" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

          {/* eyebrows */}
          <path d="M77 90C83 85 97 85 103 90" stroke="#22262b" strokeWidth="4" strokeLinecap="round" />
          <path d="M127 90C133 85 147 85 153 90" stroke="#22262b" strokeWidth="4" strokeLinecap="round" />

          {/* glasses with glow and reflections */}
          <g filter="url(#glow)">
            <rect x="71" y="97" width="35" height="25" rx="9" fill="#fff" fillOpacity="0.25" stroke="#22262b" strokeWidth="4" />
            <rect x="124" y="97" width="35" height="25" rx="9" fill="#fff" fillOpacity="0.25" stroke="#22262b" strokeWidth="4" />
          </g>
          <line x1="106" y1="108" x2="124" y2="108" stroke="#22262b" strokeWidth="4" />
          <path d="M71 104 q-8 0 -10 8" stroke="#22262b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M159 104 q8 0 10 8" stroke="#22262b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* lens glare */}
          <rect x="74" y="99" width="14" height="10" rx="4" fill="url(#lensGrad2)" />
          <rect x="127" y="99" width="14" height="10" rx="4" fill="url(#lensGrad2)" />
          {/* eyes with sparkle */}
          <circle cx="88.5" cy="109.5" r="4.5" fill="#22262b" />
          <circle cx="141.5" cy="109.5" r="4.5" fill="#22262b" />
          <circle cx="90" cy="108" r="1.5" fill="#fff" />
          <circle cx="143" cy="108" r="1.5" fill="#fff" />

          {/* nose */}
          <path d="M114 116 q3 6 0 10" stroke="#d99f6b" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />

          {/* smile with subtle glow */}
          <path d="M97 134C103 143 127 143 133 134" stroke="#7a4a25" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M104 137 q11 6 22 0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />

          {/* blush */}
          <circle cx="82" cy="124" r="7" fill="#f2a37c" opacity="0.5" />
          <circle cx="148" cy="124" r="7" fill="#f2a37c" opacity="0.5" />

          {/* floating laptop prop, enhanced */}
          <g transform="translate(150 178)">
            <g className="wave-hand">
              <rect x="-4" y="-2" width="46" height="30" rx="4" fill="#22262b" />
              <rect x="0" y="2" width="38" height="20" rx="2" fill="#0b1220" />
              <rect x="3" y="5" width="32" height="12" rx="1.5" fill="#0e9f6e" opacity="0.9" />
              <rect x="3" y="5" width="32" height="12" rx="1.5" fill="none" stroke="#22d3a5" strokeWidth="0.8" opacity="0.8" />
              <rect x="-4" y="28" width="46" height="4" rx="2" fill="#3a3f47" />
              {/* tiny code lines on screen */}
              <line x1="6" y1="8" x2="20" y2="8" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
              <line x1="6" y1="12" x2="14" y2="12" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
              <line x1="6" y1="16" x2="24" y2="16" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
            </g>
          </g>
        </svg>
      </div>

      {/* Inline keyframes for this component (self-contained) */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.8; }
          50% { transform: translateY(-5px) translateX(-3px); opacity: 0.6; }
          75% { transform: translateY(-15px) translateX(2px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function StatusPanel() {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} className="rounded-xl border border-[var(--border)] bg-[var(--panel)]/80 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">system status</p>
        <span className="flex items-center gap-2 font-mono text-[11px] text-[var(--emerald)]">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--emerald)] text-[var(--emerald)]" />
          live
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {SYSTEM_STATS.map((stat) => (
          <StatCell key={stat.label} stat={stat} inView={inView} />
        ))}
      </div>
    </div>
  );
}

function StatCell({ stat, inView }) {
  const value = useCounter(stat.value, inView);
  return (
    <div className="rounded-lg bg-[var(--panel-hi)] border border-[var(--border)] p-4">
      <p className="font-display text-2xl font-semibold text-[var(--text)]">{value}{stat.suffix}</p>
      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{stat.label}</p>
    </div>
  );
}

function Headline({ text }) {
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <h1 className="font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-[var(--text)] sm:text-6xl">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.28em] whitespace-nowrap">
          {word.split("").map((ch) => {
            const delay = 0.35 + charIndex * 0.028;
            charIndex += 1;
            return (
              <span key={charIndex} className="char-in" style={{ animationDelay: `${delay}s` }}>{ch}</span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24">
      <AmbientField />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)]/70 px-3 py-1.5 font-mono text-[11px] text-[var(--muted)]">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--amber)] text-[var(--amber)]" />
              Available for select opportunities
            </div>
            <div className="mt-6">
              <Headline text={`${PROFILE.name}`} />
            </div>
            <p className="mt-2 font-display text-xl text-[var(--muted)] sm:text-2xl">{PROFILE.role} · {PROFILE.location}</p>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-[var(--muted)]">{PROFILE.summary}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary rounded-md px-6 py-3 font-mono text-sm">view_projects()</a>
              <a href={`mailto:${PROFILE.email}`} className="rounded-md border border-[var(--border)] px-6 py-3 font-mono text-sm text-[var(--text)] transition hover:border-[var(--border-hi)] hover:bg-[var(--panel)]">say_hello()</a>
            </div>

            <div className="mt-10">
              <BootTerminal />
            </div>
          </div>

          <div className="lg:pt-1">
            <AvatarIllustration />
            <div className="mt-8">
              <StatusPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- marquee -------------------------------- */

function ToolMarquee() {
  const items = [...TOOL_LIST, ...TOOL_LIST];
  return (
    <section className="border-y border-[var(--border)] bg-[var(--panel)]/60 py-4 overflow-hidden">
      <div className="marquee-track">
        {items.map((tool, i) => (
          <span key={i} className="tag-chip mx-3 whitespace-nowrap rounded-md border border-[var(--border)] px-3 py-1.5 text-[var(--muted)]">{tool}</span>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- about ---------------------------------- */

function Reveal({ children, className = "" }) {
  const [ref, inView] = useInView(0.15);
  return <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`}>{children}</div>;
}

function SectionEyebrow({ index, label }) {
  return (
    <p className="font-mono text-xs text-[var(--emerald)]">
      <span className="text-[var(--muted)]">{index}</span> {label}
    </p>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionEyebrow index="01" label="about" />
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text)] sm:text-4xl max-w-2xl">
            I ship the parts of a product that keep it running — dashboards, permissions, and the plumbing behind them.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal>
            <div className="console-card spotlight h-full rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}>
              <p className="font-mono text-xs text-[var(--muted)]">frontend</p>
              <p className="mt-3 text-[15px] leading-7 text-[var(--text)]">React interfaces built from reusable components, with real state management and no shortcuts on responsiveness.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="console-card spotlight h-full rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}>
              <p className="font-mono text-xs text-[var(--muted)]">backend</p>
              <p className="mt-3 text-[15px] leading-7 text-[var(--text)]">REST APIs, JWT auth, and role-based access control designed to hold up once real users and real data show up.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="console-card spotlight h-full rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}>
              <p className="font-mono text-xs text-[var(--muted)]">operations</p>
              <p className="mt-3 text-[15px] leading-7 text-[var(--text)]">Cron-based notifications, Socket.io events, and S3 uploads — the background jobs that make a product feel alive.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- skills ---------------------------------- */

function Skills() {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => SKILL_CATEGORIES.filter((c) => c !== "All"), []);

  // Resolve theme colors once, build a smooth multi-stop hue arc across categories
  const paletteRef = useRef({});
  const [paletteReady, setPaletteReady] = useState(false);

  useEffect(() => {
    const resolveHSL = (varName) => {
      const el = document.createElement("div");
      el.style.color = `var(${varName})`;
      document.body.appendChild(el);
      const rgb = getComputedStyle(el).color.match(/\d+/g).map(Number);
      document.body.removeChild(el);
      const [r, g, b] = rgb.map((v) => v / 255);
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      if (max === min) h = s = 0;
      else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
      }
      return { h, s, l };
    };
    const hslToRgb = (h, s, l) => {
      h = ((h % 360) + 360) % 360;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r, g, b;
      if (h < 60) [r, g, b] = [c, x, 0];
      else if (h < 120) [r, g, b] = [x, c, 0];
      else if (h < 180) [r, g, b] = [0, c, x];
      else if (h < 240) [r, g, b] = [0, x, c];
      else if (h < 300) [r, g, b] = [x, 0, c];
      else [r, g, b] = [c, 0, x];
      return `${Math.round((r + m) * 255)},${Math.round((g + m) * 255)},${Math.round((b + m) * 255)}`;
    };

    const A = resolveHSL("--emerald");
    const B = resolveHSL("--blue");
    const map = {};
    categories.forEach((cat, i) => {
      const t = categories.length > 1 ? i / (categories.length - 1) : 0;
      let dh = B.h - A.h;
      if (dh > 180) dh -= 360;
      if (dh < -180) dh += 360;
      const h = A.h + dh * t;
      const s = Math.min(1, (A.s + (B.s - A.s) * t) * 1.1);
      const l = Math.min(0.68, A.l + (B.l - A.l) * t + 0.04);
      map[cat] = hslToRgb(h, s, l);
    });
    paletteRef.current = map;
    setPaletteReady(true);
  }, [categories]);

  const visibleCats = filter === "All" ? categories : [filter];

  return (
    <section id="skills" className="py-24 px-6 md:px-8 bg-[var(--panel)]/30 border-y border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionEyebrow index="02" label="skills" />
              <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text)] sm:text-4xl">Technical toolbox</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`tag-chip rounded-md border px-3 py-1.5 transition ${
                    filter === cat
                      ? "border-[var(--emerald)] bg-[var(--emerald)]/10 text-[var(--emerald)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-hi)] hover:text-[var(--text)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCats.map((cat) => {
            const items = SKILLS.filter((s) => s.category === cat).sort((a, b) => b.level - a.level);
            const rgb = paletteReady ? paletteRef.current[cat] : "16,185,129";
            return (
              <div key={cat}>
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: `rgb(${rgb})` }}
                  />
                  <h3 className="font-mono text-[11px] tracking-wide text-[var(--muted)]">{cat}</h3>
                </div>

                <ul className="mt-4 space-y-4 border-l border-[var(--border)] pl-4">
                  {items.map((skill) => {
                    const size = 0.95 + (skill.level / 100) * 0.4; // 0.95–1.35rem
                    return (
                      <li key={skill.name} className="group">
                        <div className="flex items-baseline justify-between gap-3">
                          <span
                            className="font-display text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--text)]"
                            style={{
                              fontSize: `${size}rem`,
                              fontWeight: 450 + Math.round((skill.level / 100) * 250),
                            }}
                          >
                            {skill.name}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] tabular-nums text-[var(--muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {skill.level}
                          </span>
                        </div>
                        <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-[var(--panel-hi)]">
                          <div
                            className="h-full rounded-full transition-[filter] duration-200"
                            style={{
                              width: `${skill.level}%`,
                              background: `rgb(${rgb})`,
                              filter: "brightness(0.85)",
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- experience -------------------------------- */

function ExperienceItem({ job, index, total }) {
  const [ref, inView] = useInView(0.35);
  return (
    <div ref={ref} className="relative pl-10">
      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-[var(--bg)]"
        style={{ background: job.status === "current" ? "var(--emerald)" : "var(--muted)" }} />
      {index < total - 1 && (
        <div className="absolute left-[5px] top-4 bottom-[-2.5rem] w-px bg-[var(--border)] overflow-hidden">
          <div className={`timeline-line h-full w-full bg-[var(--emerald)] ${inView ? "in" : ""}`} />
        </div>
      )}
      <Reveal>
        <div className="pb-14">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold text-[var(--text)]">{job.role}</h3>
            {job.status === "current" && (
              <span className="flex items-center gap-1.5 font-mono text-[11px] status-current">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--emerald)] text-[var(--emerald)]" /> current
              </span>
            )}
          </div>
          <p className="mt-1 font-mono text-sm text-[var(--muted)]">{job.company} · {job.location} · {job.period}</p>
          <ul className="mt-4 space-y-2.5">
            {job.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[15px] leading-7 text-[var(--muted)]">
                <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--blue)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionEyebrow index="03" label="experience" />
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text)] sm:text-4xl">Career log</h2>
        </Reveal>

        <div className="mt-12">
          {EXPERIENCE.map((job, i) => (
            <ExperienceItem key={job.company} job={job} index={i} total={EXPERIENCE.length} />
          ))}
        </div>

        <Reveal>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">education</p>
            <p className="mt-3 font-display text-lg font-semibold text-[var(--text)]">{EDUCATION.degree}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{EDUCATION.school} · {EDUCATION.location} · {EDUCATION.period}</p>
            <div className="mt-5 border-t border-[var(--border)] pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">certifications</p>
              <div className="mt-3 flex flex-col gap-2">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.title} className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                    <span className="text-[var(--text)]">{c.title}</span>
                    <span className="font-mono text-xs text-[var(--muted)]">{c.issuer} · {c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- projects --------------------------------- */

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const onMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "";
  }, []);

  return (
    <Reveal>
      <article
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="spotlight console-card rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8 transition-transform"
        style={{ transitionProperty: "transform, border-color, box-shadow" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-[var(--muted)]">0{index + 1}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--text)]">{project.title}</h3>
            <p className="mt-1 font-mono text-xs text-[var(--emerald)]">{project.tag}</p>
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" data-cursor-hover
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition hover:border-[var(--emerald)] hover:text-[var(--emerald)]">
              ↗
            </a>
          )}
        </div>
        <p className="mt-5 text-[15px] leading-7 text-[var(--muted)]">{project.description}</p>
        <ul className="mt-5 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--amber)]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tool) => (
            <span key={tool} className="tag-chip rounded-md border border-[var(--border)] px-2.5 py-1 text-[var(--muted)]">{tool}</span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-8 bg-[var(--panel)]/30 border-y border-[var(--border)]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionEyebrow index="04" label="projects" />
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text)] sm:text-4xl">Featured work</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- contact --------------------------------- */

function MagneticButton({ children, ...props }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} {...props}
      style={{ transition: "transform 0.15s ease" }}>
      {children}
    </button>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Portfolio inquiry from " + form.name)}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`;
    window.open(mailto, "_blank");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionEyebrow index="05" label="contact" />
            <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--text)] sm:text-4xl">Let's build the next thing.</h2>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-[var(--muted)]">
              Open to full-time roles and select freelance work. Fastest way to reach me is email — usually a reply within a day.
            </p>
            <div className="mt-8 flex flex-col gap-3 font-mono text-sm">
              <a href={`mailto:${PROFILE.email}`} className="text-[var(--text)] hover:text-[var(--emerald)] transition">{PROFILE.email}</a>
              <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="text-[var(--text)] hover:text-[var(--emerald)] transition">{PROFILE.phone}</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-[var(--text)] hover:text-[var(--emerald)] transition">github.com/divydadhich</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-[var(--text)] hover:text-[var(--emerald)] transition">linkedin.com/in/divydadhich</a>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--emerald)]/15 text-2xl text-[var(--emerald)]">✓</span>
                  <p className="font-display text-xl font-semibold text-[var(--text)]">Message queued.</p>
                  <p className="font-mono text-xs text-[var(--muted)]">status: sent — expect a reply within 24h</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">name</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--panel-hi)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--emerald)]"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--panel-hi)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--emerald)]"
                      placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">message</label>
                    <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                      className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--panel-hi)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--emerald)]"
                      placeholder="What are you building?" />
                  </div>
                  <MagneticButton type="submit" data-cursor-hover className="btn-primary w-full rounded-md py-3 font-mono text-sm">
                    send_message()
                  </MagneticButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10 px-6 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 font-mono text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <span>{PROFILE.name} — {PROFILE.role}</span>
        <span>© {new Date().getFullYear()} · built with React + Tailwind</span>
      </div>
    </footer>
  );
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  const progress = useScrollProgress();

  return (
    <div className="console-root relative min-h-screen overflow-x-hidden">
      <GlobalStyles />
      <CustomCursor />
      <Navbar progress={progress} />
      <main className="relative z-10">
        <Hero />
        <ToolMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}