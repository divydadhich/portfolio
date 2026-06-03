import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GLOBAL STYLES ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background: #080b0f;
      color: #e8eaf0;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5 {
      font-family: 'Syne', sans-serif;
    }

    code, .mono {
      font-family: 'JetBrains Mono', monospace;
    }

    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      background: #080b0f;
    }
    ::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 2px;
    }

    ::selection {
      background: #22c55e33;
      color: #22c55e;
    }

    /* Cursor effects */
    .cursor-dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      mix-blend-mode: difference;
    }

    .cursor-ring {
      width: 36px;
      height: 36px;
      border: 1.5px solid #22c55e44;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.12s ease, width 0.2s, height 0.2s, border-color 0.2s;
    }

    .cursor-ring.hover {
      width: 56px;
      height: 56px;
      border-color: #22c55e99;
    }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes borderPulse {
      0%, 100% { border-color: #22c55e44; }
      50% { border-color: #22c55e99; }
    }
    @keyframes gridPulse {
      0%, 100% { opacity: 0.03; }
      50% { opacity: 0.07; }
    }
    @keyframes orb1 {
      0%, 100% { transform: translate(0,0) scale(1); }
      33% { transform: translate(80px,-60px) scale(1.1); }
      66% { transform: translate(-40px,80px) scale(0.9); }
    }
    @keyframes orb2 {
      0%, 100% { transform: translate(0,0) scale(1); }
      33% { transform: translate(-60px,40px) scale(0.9); }
      66% { transform: translate(60px,-80px) scale(1.1); }
    }

    .animate-fadeUp {
      animation: fadeUp 0.8s ease both;
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .animate-spin-slow {
      animation: spin 8s linear infinite;
    }
    .animate-marquee {
      animation: marquee 24s linear infinite;
    }
    .shimmer-text {
      background: linear-gradient(90deg, #e8eaf0 0%, #22c55e 40%, #86efac 60%, #e8eaf0 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }
    .glow-text {
      text-shadow: 0 0 40px #22c55e66, 0 0 80px #22c55e33;
    }
    .card-hover {
      transition: transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 60px #22c55e18;
      border-color: #22c55e44 !important;
    }
    .nav-link::after {
      content: '';
      display: block;
      height: 1px;
      background: #22c55e;
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: left;
    }
    .nav-link:hover::after,
    .nav-link.active::after {
      transform: scaleX(1);
    }
    .section-fade {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .section-fade.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .skill-bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, #22c55e, #86efac);
      transition: width 1.2s cubic-bezier(.4,0,.2,1);
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 500;
      font-family: 'JetBrains Mono', monospace;
      padding: 4px 10px;
      border-radius: 4px;
      background: #ffffff08;
      border: 1px solid #ffffff12;
      color: #9ca3af;
      letter-spacing: 0.02em;
      transition: all 0.2s;
    }
    .tag:hover {
      background: #22c55e14;
      border-color: #22c55e44;
      color: #86efac;
    }
    .noise-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1000;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .timeline-node {
      position: relative;
    }
    .timeline-node::before {
      content: '';
      position: absolute;
      left: 19px;
      top: 40px;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, #22c55e44, transparent);
    }
    input, textarea, select {
      background: #0d1117;
      border: 1px solid #1f2937;
      color: #e8eaf0;
      border-radius: 10px;
      padding: 14px 18px;
      width: 100%;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input:focus, textarea:focus, select:focus {
      border-color: #22c55e66;
      box-shadow: 0 0 0 3px #22c55e11;
    }
    textarea {
      resize: vertical;
      min-height: 130px;
    }
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, #22c55e, #86efac);
      z-index: 9997;
      transition: width 0.1s linear;
    }
    /* Utility */
    .flex-center {
      display: flex;
      align-items: center;
    }
  `}</style>
);

/* ─── DATA ─── */
const SKILLS_DATA = [
  { name: "React.js", level: 92, cat: "Frontend" },
  { name: "Node.js", level: 88, cat: "Backend" },
  { name: "MongoDB", level: 85, cat: "Database" },
  { name: "Express.js", level: 88, cat: "Backend" },
  { name: "Redux", level: 82, cat: "Frontend" },
  { name: "Tailwind CSS", level: 95, cat: "Frontend" },
  { name: "REST API Design", level: 90, cat: "Backend" },
  { name: "JWT / RBAC", level: 87, cat: "Backend" },
  { name: "Socket.io", level: 78, cat: "Realtime" },
  { name: "AWS S3", level: 75, cat: "Cloud" },
  { name: "SQL", level: 72, cat: "Database" },
  { name: "Git & GitHub", level: 90, cat: "Tools" },
];

const TOOLS = [
  "React.js", "Node.js", "MongoDB", "Express", "Redux", "Tailwind",
  "Ant Design", "Material UI", "Socket.io", "AWS S3", "JWT", "Postman",
  "Git", "GitHub", "REST API", "MVC", "RBAC", "SQL", "JavaScript",
  "HTML5", "CSS3", "VS Code", "Vite"
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Kotibox Global Technologies",
    period: "Nov 2025 – Present",
    type: "Full-time",
    location: "Jaipur, IN",
    color: "#22c55e",
    bullets: [
      "Built XOTO Grid (real-estate marketplace) and XOTO Vault (partner platform) for live business clients using the full MERN stack.",
      "Architected RBAC systems spanning 7+ user personas — Admin, Agent, Advisor, Agency, Developer, Referral Partner, Customer — with fine-grained permission control.",
      "Engineered reusable React component libraries with Ant Design + Tailwind, cutting dev time across projects.",
      "Directly interfaced with clients: gathering requirements, presenting demos, and shipping iterative feedback into production.",
    ],
  },
  {
    role: "MERN Stack Developer Trainee",
    company: "Global IT Providers",
    period: "Mar 2025 – Sep 2025",
    type: "Internship",
    location: "Jaipur, IN",
    color: "#3b82f6",
    bullets: [
      "Built full-stack MERN applications with RESTful APIs, JWT auth, and role-based authorization.",
      "Integrated React frontends with Express/Node backends; optimized MongoDB queries and schema design for performance.",
      "Shipped clean, modular, and maintainable code across collaborative team projects.",
    ],
  },
  {
    role: "Web Designer Trainee",
    company: "Seldom India",
    period: "May 2023 – Jul 2023",
    type: "Internship",
    location: "Jaipur, IN",
    color: "#a78bfa",
    bullets: [
      "Designed and built responsive client websites using HTML, CSS, and JavaScript.",
      "Collaborated on UI/UX improvements and adopted professional workflows and design critique cycles.",
    ],
  },
];

const PROJECTS = [
  {
    name: "XOTO Grid",
    tagline: "Real-Estate Marketplace",
    description:
      "A large-scale real-estate platform with 7 role-specific dashboards, intelligent lead management with auto-classification, deduplication, and performance-based advisor assignment.",
    stack: ["React.js", "Node.js", "MongoDB", "Redux", "Socket.io", "AWS S3", "Express.js"],
    accent: "#22c55e",
    metrics: ["7 User Roles", "Live Clients", "Real-time Updates"],
    featured: true,
  },
  {
    name: "XOTO Vault",
    tagline: "Partner Ecosystem Platform",
    description:
      "Multi-step partner onboarding with KYC (Emirates ID, Passport, Trade License), structured lead pipelines, and automated commission tracking with Pending→Confirmed→Paid flow.",
    stack: ["React.js", "Node.js", "MongoDB", "Ant Design", "AWS S3"],
    accent: "#3b82f6",
    metrics: ["KYC Workflows", "Commission Engine", "Deal Verification"],
    featured: true,
  },
  {
    name: "XOTO.ae",
    tagline: "Corporate Website",
    description:
      "Full UI/UX design and development for an official UAE real-estate brand — responsive, brand-aligned, and refined through multiple stakeholder feedback cycles.",
    stack: ["React.js", "Tailwind CSS", "JavaScript"],
    accent: "#a78bfa",
    metrics: ["UAE Market", "Responsive", "Stakeholder Approved"],
    featured: false,
  },
  {
    name: "Taazi Bhaazi",
    tagline: "Quick Commerce Platform",
    description:
      "A quick-commerce MERN platform bridging local produce sellers with nearby buyers — real-time product listings, live inventory, and delivery tracking.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    accent: "#f59e0b",
    metrics: ["Real-time Listings", "Delivery Tracking", "Seller Dashboard"],
    featured: false,
  },
  {
    name: "Compostify",
    tagline: "Waste Management System",
    description:
      "Team-based food waste management platform routing donations to NGOs and organic waste to compost agencies — full MERN contribution on both frontend and backend.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    accent: "#14b8a6",
    metrics: ["NGO Integration", "Waste Routing", "Team Platform"],
    featured: false,
  },
];

const SERVICES = [
  {
    icon: "⚡",
    title: "Full-Stack Web Apps",
    desc: "End-to-end MERN applications with complex business logic, authentication, and real-time capabilities.",
  },
  {
    icon: "🏗️",
    title: "RBAC Architecture",
    desc: "Multi-role systems with fine-grained permissions, workflow automation, and admin dashboards.",
  },
  {
    icon: "🔌",
    title: "REST API Design",
    desc: "Scalable, well-documented APIs with JWT auth, rate limiting, and optimized MongoDB queries.",
  },
  {
    icon: "🎨",
    title: "React UI Development",
    desc: "Responsive, component-driven interfaces with Redux state management and design system integration.",
  },
  {
    icon: "🚀",
    title: "MVP Development",
    desc: "Rapid prototype-to-production for startups — fast, functional, and built to scale.",
  },
  {
    icon: "🔍",
    title: "Code Review & Refactor",
    desc: "Clean up legacy codebases, improve performance, add TypeScript, or modernize architecture.",
  },
];

/* ─── CUSTOM HOOKS ─── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return progress;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function useTypewriter(words, speed = 80, deleteSpeed = 45, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setCharIndex((prev) => (deleting ? prev - 1 : prev + 1));
        setText(currentWord.slice(0, deleting ? charIndex - 1 : charIndex + 1));
      }, deleting ? deleteSpeed : speed);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, deleteSpeed, pause]);

  return text;
}

function useCounter(target, duration = 1500, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ─── CURSOR COMPONENT ─── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const moveHandler = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX - 4 + "px";
        dotRef.current.style.top = e.clientY - 4 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX - 18 + "px";
        ringRef.current.style.top = e.clientY - 18 + "px";
      }
    };

    const mouseOverHandler = (e) => {
      if (e.target.closest("a, button, [data-hover]")) setHover(true);
    };
    const mouseOutHandler = () => setHover(false);

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseover", mouseOverHandler);
    window.addEventListener("mouseout", mouseOutHandler);
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", mouseOverHandler);
      window.removeEventListener("mouseout", mouseOutHandler);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transform: hover ? "scale(2)" : "scale(1)" }} />
      <div ref={ringRef} className={`cursor-ring ${hover ? "hover" : ""}`} />
    </>
  );
}

/* ─── PARTICLE BACKGROUND ─── */
function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouse = { x: width / 2, y: height / 2 };

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const mouseMove = (e) => (mouse = { x: e.clientX, y: e.clientY });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mouseMove);

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += dx * 0.00008;
          p.vy += dy * 0.00008;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34,197,94,${0.12 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ─── NAVBAR ─── */
function Navbar({ scrollProgress }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Projects", "Services", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id.toLowerCase());
    setMenuOpen(false);
  };

  return (
    <>
      <div className="progress-bar" style={{ width: scrollProgress + "%" }} />
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: "0 40px",
          background: scrolled ? "rgba(8,11,15,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid #ffffff08" : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em" }}>
          <span style={{ color: "#22c55e" }}>D</span>ivy
          <span style={{ color: "#22c55e", fontSize: 28 }}>.</span>
        </div>

        <ul className="flex-center" style={{ gap: 36, listStyle: "none" }}>
          {links.map((link) => (
            <li key={link}>
              <button
                className={`nav-link ${active === link.toLowerCase() ? "active" : ""}`}
                onClick={() => scrollTo(link)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: active === link.toLowerCase() ? "#22c55e" : "#9ca3af",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  padding: "4px 0",
                }}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="mailto:divydadhich1234@gmail.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#22c55e",
            color: "#080b0f",
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: 13,
            padding: "10px 22px",
            borderRadius: 50,
            letterSpacing: "0.02em",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#16a34a";
            e.currentTarget.style.boxShadow = "0 8px 30px #22c55e44";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#22c55e";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Hire Me →
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid #1f2937",
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
            color: "#e8eaf0",
          }}
          className="menu-toggle"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            zIndex: 899,
            background: "#0d1117",
            borderBottom: "1px solid #1f2937",
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#e8eaf0",
                fontFamily: "'Syne',sans-serif",
                fontSize: 18,
                fontWeight: 700,
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              {link}
            </button>
          ))}
          <a
            href="mailto:divydadhich1234@gmail.com"
            style={{
              background: "#22c55e",
              color: "#080b0f",
              padding: "14px",
              borderRadius: 12,
              textAlign: "center",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "'Syne',sans-serif",
            }}
          >
            Hire Me →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav ul { display: none !important; }
          nav a { display: none !important; }
          .menu-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}

/* ─── HERO SECTION ─── */
function Hero() {
  const typed = useTypewriter([
    "Full Stack Developer",
    "MERN Specialist",
    "React Engineer",
    "API Architect",
    "Open to Freelance",
  ]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "#080b0f",
      }}
    >
      <ParticleBackground />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(#22c55e06 1px, transparent 1px), linear-gradient(90deg, #22c55e06 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "gridPulse 4s ease-in-out infinite",
        }}
      />

      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #22c55e18 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "orb1 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, #3b82f614 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "orb2 15s ease-in-out infinite",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px 60px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 780 }}>
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#22c55e10",
              border: "1px solid #22c55e33",
              borderRadius: 50,
              padding: "8px 18px",
              marginBottom: 36,
              width: "fit-content",
              animation: "fadeUp 0.6s ease both",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                display: "block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "#86efac",
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: "0.08em",
              }}
            >
              Available for work & freelance
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(52px, 9vw, 96px)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: 8,
              animation: "fadeUp 0.7s 0.1s ease both",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Divy
            <br />
            <span className="shimmer-text">Dadhich</span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
              animation: "fadeUp 0.7s 0.2s ease both",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <div style={{ width: 32, height: 2, background: "#22c55e", borderRadius: 2 }} />
            <span style={{ fontSize: 20, color: "#6b7280", fontWeight: 300 }}>
              {typed}
              <span
                style={{
                  animation: "pulse 1s ease-in-out infinite",
                  display: "inline-block",
                  color: "#22c55e",
                  fontWeight: 400,
                }}
              >
                |
              </span>
            </span>
          </div>

          <p
            style={{
              fontSize: 18,
              color: "#6b7280",
              lineHeight: 1.8,
              maxWidth: 560,
              marginBottom: 44,
              fontWeight: 300,
              animation: "fadeUp 0.7s 0.3s ease both",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Building complex, production-grade MERN platforms — from 7-role real-estate systems to partner ecosystems.
            I write code that ships, scales, and solves real problems.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 72,
              animation: "fadeUp 0.7s 0.4s ease both",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#22c55e",
                color: "#080b0f",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                padding: "15px 32px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#16a34a";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px #22c55e44";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#22c55e";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="/resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                color: "#e8eaf0",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: 15,
                padding: "15px 32px",
                borderRadius: 50,
                border: "1px solid #1f2937",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#22c55e66";
                e.currentTarget.style.color = "#22c55e";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#1f2937";
                e.currentTarget.style.color = "#e8eaf0";
                e.currentTarget.style.transform = "none";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download CV
            </a>
          </div>

          <div
            style={{
              display: "flex",
              gap: 48,
              flexWrap: "wrap",
              animation: "fadeUp 0.7s 0.5s ease both",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            {[["1+", "Years Exp."], ["5+", "Live Projects"], ["7+", "Roles Built"], ["3", "Companies"]].map(
              ([number, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      fontFamily: "'Syne',sans-serif",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {number}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#4b5563",
                      fontWeight: 500,
                      marginTop: 4,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeIn 1s 1s ease both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: "#4b5563",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono',monospace",
              writingMode: "vertical-rl",
            }}
          >
            Scroll down
          </span>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, #22c55e, transparent)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── MARQUEE TICKER ─── */
function Ticker() {
  return (
    <div
      style={{
        background: "#0d1117",
        borderTop: "1px solid #1f2937",
        borderBottom: "1px solid #1f2937",
        padding: "14px 0",
        overflow: "hidden",
      }}
    >
      <div className="animate-marquee" style={{ display: "flex", gap: 40, width: "max-content" }}>
        {[...TOOLS, ...TOOLS].map((tool, idx) => (
          <span
            key={idx}
            style={{
              fontSize: 13,
              color: "#4b5563",
              fontFamily: "'JetBrains Mono',monospace",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {tool}
            <span style={{ color: "#22c55e", fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT SECTION ─── */
function About() {
  const [ref, inView] = useInView();
  const projectCount = useCounter(5, 1500, inView);

  return (
    <section id="about" style={{ padding: "120px 40px", background: "#080b0f" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Visual */}
        <div ref={ref} style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "4/5",
              background: "#0d1117",
              borderRadius: 24,
              border: "1px solid #1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Fake code */}
            <div style={{ position: "absolute", inset: 0, padding: 32, overflow: "hidden", opacity: 0.35 }}>
              {[
                "const Divy = {",
                '  role: "Full Stack Dev",',
                '  stack: ["MERN"],',
                '  location: "Jaipur, IN",',
                '  status: "Available",',
                '  experience: "1+ yrs",',
                "};",
                "",
                "export default Divy;",
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 13,
                    color: i === 0 || i === 6 || i === 8 ? "#22c55e" : i === 7 ? "transparent" : "#6b7280",
                    lineHeight: 2,
                    whiteSpace: "pre",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #22c55e33, #22c55e11)",
                  border: "2px solid #22c55e44",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  animation: "borderPulse 3s ease-in-out infinite",
                }}
              >
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 36, color: "#22c55e" }}>DD</span>
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: "#e8eaf0" }}>
                Divy Dadhich
              </div>
              <div style={{ fontSize: 13, color: "#4b5563", fontFamily: "'JetBrains Mono',monospace", marginTop: 6 }}>
                Full Stack Developer
              </div>
            </div>

            <div
              className="animate-float"
              style={{
                position: "absolute",
                top: 24,
                right: -16,
                background: "#0d1117",
                border: "1px solid #1f2937",
                borderRadius: 12,
                padding: "10px 16px",
                fontSize: 13,
                color: "#22c55e",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
              }}
            >
              🟢 Open to Work
            </div>
            <div
              className="animate-float"
              style={{
                position: "absolute",
                bottom: 32,
                left: -16,
                background: "#0d1117",
                border: "1px solid #1f2937",
                borderRadius: 12,
                padding: "10px 16px",
                fontSize: 13,
                color: "#e8eaf0",
                fontFamily: "'JetBrains Mono',monospace",
                animationDelay: "0.5s",
              }}
            >
              Jaipur, IN 📍
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: -24,
              right: -24,
              background: "#0d1117",
              border: "1px solid #22c55e33",
              borderRadius: 16,
              padding: "20px 28px",
              textAlign: "center",
              boxShadow: "0 20px 60px #22c55e18",
            }}
          >
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 40, color: "#22c55e", lineHeight: 1 }}>
              {projectCount}+
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#4b5563",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Projects
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex-center" style={{ gap: 12, marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span
              style={{
                fontSize: 12,
                color: "#22c55e",
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              About Me
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px,5vw,52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            I build things that
            <br />
            <span style={{ color: "#22c55e" }}>actually work</span>
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>
            I'm a Full Stack Developer from Jaipur, Rajasthan, currently building production-grade MERN applications at
            Kotibox Global Technologies. I've shipped real-estate marketplaces, partner ecosystems, and role-based
            platforms used by live clients.
          </p>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.85, marginBottom: 36, fontWeight: 300 }}>
            My strength is in end-to-end ownership — from gathering client requirements to architecting complex RBAC
            systems to deploying and iterating in production. I'm equally comfortable with freelance projects and
            full-time roles.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
            {[
              { label: "Education", val: "B.Tech CS, Sobhasaria Group of Institutions, 2025" },
              { label: "Location", val: "Jaipur, Rajasthan, India" },
              { label: "Email", val: "divydadhich1234@gmail.com" },
              { label: "Phone", val: "+91 7073091731" },
            ].map(({ label, val }) => (
              <div
                key={label}
                style={{
                  background: "#0d1117",
                  border: "1px solid #1f2937",
                  borderRadius: 12,
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#4b5563",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono',monospace",
                    marginBottom: 6,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "#e8eaf0", fontWeight: 500 }}>{val}</div>
              </div>
            ))}
          </div>

          <div className="flex-center" style={{ gap: 16 }}>
            {[
              ["GitHub", "https://github.com", "#1f2937"],
              ["LinkedIn", "https://linkedin.com", "#1f2937"],
              ["Portfolio", "#", "#22c55e33"],
            ].map(([name, href, bg]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 24px",
                  borderRadius: 50,
                  border: `1px solid ${bg}`,
                  color: name === "Portfolio" ? "#22c55e" : "#9ca3af",
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#22c55e66";
                  e.currentTarget.style.color = "#22c55e";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = bg;
                  e.currentTarget.style.color = name === "Portfolio" ? "#22c55e" : "#9ca3af";
                }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS SECTION ─── */
function Skills() {
  const [ref, inView] = useInView(0.1);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Frontend", "Backend", "Database", "Realtime", "Cloud", "Tools"];
  const filteredSkills = filter === "All" ? SKILLS_DATA : SKILLS_DATA.filter((s) => s.cat === filter);

  return (
    <section id="skills" style={{ padding: "120px 40px", background: "#0a0e14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="flex-center" style={{ gap: 12, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <span
            style={{
              fontSize: 12,
              color: "#22c55e",
              fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Technical Skills
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 52,
          }}
        >
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px,5vw,52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            My Tech <span style={{ color: "#22c55e" }}>Arsenal</span>
          </h2>
          <div className="flex-center" style={{ gap: 8, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "7px 18px",
                  borderRadius: 50,
                  border: "1px solid",
                  borderColor: filter === cat ? "#22c55e" : "#1f2937",
                  background: filter === cat ? "#22c55e14" : "transparent",
                  color: filter === cat ? "#22c55e" : "#6b7280",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono',monospace",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 20 }}>
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className="card-hover"
              style={{
                background: "#0d1117",
                border: "1px solid #1f2937",
                borderRadius: 16,
                padding: "24px 28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#e8eaf0", marginBottom: 4 }}>
                    {skill.name}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#4b5563",
                      fontFamily: "'JetBrains Mono',monospace",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {skill.cat}
                  </span>
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#22c55e" }}>
                  {skill.level}
                </div>
              </div>
              <div style={{ height: 4, background: "#1f2937", borderRadius: 4, overflow: "hidden" }}>
                <div
                  className="skill-bar-fill"
                  style={{
                    width: inView ? skill.level + "%" : "0%",
                    transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${idx * 0.06}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE SECTION ─── */
function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" style={{ padding: "120px 40px", background: "#080b0f" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="flex-center" style={{ gap: 12, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <span
            style={{
              fontSize: 12,
              color: "#22c55e",
              fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Experience
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px,5vw,52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 60,
          }}
        >
          Where I've <span style={{ color: "#22c55e" }}>Worked</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 40 }}>
          <div className="timeline-node" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {EXPERIENCE.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  textAlign: "left",
                  background: active === i ? "#0d1117" : "transparent",
                  border: active === i ? `1px solid ${exp.color}33` : "1px solid transparent",
                  cursor: "pointer",
                  padding: "20px 24px 20px 44px",
                  borderRadius: 12,
                  position: "relative",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: active === i ? exp.color : "#1f2937",
                    border: `2px solid ${active === i ? exp.color : "#374151"}`,
                    transition: "all 0.2s",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: active === i ? "#e8eaf0" : "#6b7280",
                    marginBottom: 4,
                  }}
                >
                  {exp.company}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: active === i ? exp.color : "#374151",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {exp.period}
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 20, padding: 40 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, color: "#e8eaf0", marginBottom: 6 }}>
                  {EXPERIENCE[active].role}
                </h3>
                <div className="flex-center" style={{ gap: 12, flexWrap: "wrap" }}>
                  <span
                    style={{
                      color: EXPERIENCE[active].color,
                      fontWeight: 600,
                      fontSize: 15,
                      fontFamily: "'Syne',sans-serif",
                    }}
                  >
                    {EXPERIENCE[active].company}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      background: EXPERIENCE[active].color + "20",
                      color: EXPERIENCE[active].color,
                      padding: "3px 10px",
                      borderRadius: 50,
                      fontFamily: "'JetBrains Mono',monospace",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {EXPERIENCE[active].type}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#4b5563", marginTop: 6, fontFamily: "'JetBrains Mono',monospace" }}>
                  {EXPERIENCE[active].location} · {EXPERIENCE[active].period}
                </div>
              </div>
            </div>

            <div style={{ width: "100%", height: 1, background: "#1f2937", marginBottom: 28 }} />
            <ul style={{ display: "flex", flexDirection: "column", gap: 16, listStyle: "none" }}>
              {EXPERIENCE[active].bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 14, fontSize: 15, color: "#9ca3af", lineHeight: 1.7 }}>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: EXPERIENCE[active].color + "20",
                      border: `1px solid ${EXPERIENCE[active].color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  >
                    <span
                      style={{ width: 5, height: 5, borderRadius: "50%", background: EXPERIENCE[active].color }}
                    />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS SECTION ─── */
function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" style={{ padding: "120px 40px", background: "#0a0e14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="flex-center" style={{ gap: 12, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <span
            style={{
              fontSize: 12,
              color: "#22c55e",
              fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Selected Work
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 60,
          }}
        >
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px,5vw,52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Things I've <span style={{ color: "#22c55e" }}>Built</span>
          </h2>
          <p style={{ fontSize: 15, color: "#4b5563", maxWidth: 360, lineHeight: 1.7, fontWeight: 300 }}>
            Real platforms. Real users. Real business impact.
          </p>
        </div>

        {/* Featured projects */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          {featured.map((proj, i) => (
            <div
              key={proj.name}
              className="card-hover"
              style={{
                background: "#0d1117",
                border: "1px solid #1f2937",
                borderRadius: 20,
                padding: 36,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 200,
                  height: 200,
                  background: `radial-gradient(circle, ${proj.accent}12 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: proj.accent + "18",
                    border: `1px solid ${proj.accent}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: proj.accent }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#374151" }}>
                  0{i + 1}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#e8eaf0", marginBottom: 6 }}>
                {proj.name}
              </h3>
              <div
                style={{
                  fontSize: 11,
                  color: proj.accent,
                  fontFamily: "'JetBrains Mono',monospace",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {proj.tagline}
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>
                {proj.description}
              </p>
              <div className="flex-center" style={{ gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {proj.metrics.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontSize: 11,
                      background: proj.accent + "15",
                      color: proj.accent,
                      padding: "4px 12px",
                      borderRadius: 50,
                      fontFamily: "'JetBrains Mono',monospace",
                      border: `1px solid ${proj.accent}33`,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex-center" style={{ gap: 6, flexWrap: "wrap" }}>
                {proj.stack.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {rest.map((proj, i) => (
            <div
              key={proj.name}
              className="card-hover"
              style={{
                background: "#0d1117",
                border: "1px solid #1f2937",
                borderRadius: 20,
                padding: 28,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle, ${proj.accent}10 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: proj.accent + "18",
                    border: `1px solid ${proj.accent}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: proj.accent }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#374151" }}>
                  0{i + 3}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#e8eaf0", marginBottom: 4 }}>
                {proj.name}
              </h3>
              <div
                style={{
                  fontSize: 10,
                  color: proj.accent,
                  fontFamily: "'JetBrains Mono',monospace",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {proj.tagline}
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 18, fontWeight: 300 }}>
                {proj.description}
              </p>
              <div className="flex-center" style={{ gap: 5, flexWrap: "wrap" }}>
                {proj.stack.slice(0, 4).map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES SECTION ─── */
function Services() {
  return (
    <section id="services" style={{ padding: "120px 40px", background: "#080b0f", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#22c55e04 1px, transparent 1px), linear-gradient(90deg, #22c55e04 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div className="flex-center" style={{ gap: 12, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <span
            style={{
              fontSize: 12,
              color: "#22c55e",
              fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Services
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 60,
          }}
        >
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px,5vw,52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            What I Can
            <br />
            <span style={{ color: "#22c55e" }}>Do For You</span>
          </h2>
          <p style={{ fontSize: 15, color: "#4b5563", maxWidth: 360, lineHeight: 1.7, fontWeight: 300 }}>
            From solo freelance projects to joining your dev team — here's what I bring.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px,1fr))", gap: 20 }}>
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className="card-hover"
              style={{
                background: "#0d1117",
                border: "1px solid #1f2937",
                borderRadius: 20,
                padding: "32px 36px",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontSize: 32, flexShrink: 0 }}>{svc.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: "#e8eaf0", marginBottom: 10 }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, fontWeight: 300 }}>{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          style={{
            marginTop: 60,
            background: "linear-gradient(135deg, #22c55e14, #22c55e06)",
            border: "1px solid #22c55e33",
            borderRadius: 24,
            padding: "52px 60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, color: "#e8eaf0", marginBottom: 10 }}>
              Ready to start a project?
            </h3>
            <p style={{ fontSize: 15, color: "#6b7280", fontWeight: 300 }}>
              Let's build something great together. I respond within 24 hours.
            </p>
          </div>
          <a
            href="mailto:divydadhich1234@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#22c55e",
              color: "#080b0f",
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 16,
              padding: "16px 36px",
              borderRadius: 50,
              textDecoration: "none",
              transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#16a34a";
              e.currentTarget.style.boxShadow = "0 12px 40px #22c55e44";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#22c55e";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT SECTION ─── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Portfolio Enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget}\n\n${form.message}`
    );
    window.open(`mailto:divydadhich1234@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" style={{ padding: "120px 40px", background: "#0a0e14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="flex-center" style={{ display: "inline-flex", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span
              style={{
                fontSize: 12,
                color: "#22c55e",
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Contact
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px,6vw,72px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: 16,
            }}
          >
            Let's Build
            <br />
            <span className="shimmer-text">Something Great</span>
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 500, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>
            Open to full-time roles and freelance projects. Drop me a message and let's talk.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40 }}>
          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                label: "Email",
                val: "divydadhich1234@gmail.com",
                href: "mailto:divydadhich1234@gmail.com",
                iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              },
              {
                label: "Phone",
                val: "+91 7073091731",
                href: "tel:+917073091731",
                iconPath:
                  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              },
              {
                label: "Location",
                val: "Jaipur, Rajasthan, India",
                href: null,
                iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="card-hover"
                style={{
                  background: "#0d1117",
                  border: "1px solid #1f2937",
                  borderRadius: 16,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "#22c55e14",
                    border: "1px solid #22c55e22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
                    <path d={c.iconPath} />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#4b5563",
                      fontFamily: "'JetBrains Mono',monospace",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      style={{ fontSize: 14, color: "#e8eaf0", fontWeight: 500, textDecoration: "none" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#22c55e")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "#e8eaf0")}
                    >
                      {c.val}
                    </a>
                  ) : (
                    <span style={{ fontSize: 14, color: "#e8eaf0", fontWeight: 500 }}>{c.val}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 16, padding: "24px" }}>
              <div
                style={{
                  fontSize: 12,
                  color: "#4b5563",
                  fontFamily: "'JetBrains Mono',monospace",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}
              >
                Find me on
              </div>
              <div className="flex-center" style={{ gap: 12 }}>
                {[
                  {
                    name: "GitHub",
                    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
                  },
                  {
                    name: "LinkedIn",
                    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    aria-label={s.name}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "#1a1f2e",
                      border: "1px solid #1f2937",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#22c55e44";
                      e.currentTarget.style.background = "#22c55e14";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#1f2937";
                      e.currentTarget.style.background = "#1a1f2e";
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 20, padding: "40px 44px" }}>
            {sent ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  gap: 16,
                  padding: "40px 0",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#22c55e18",
                    border: "2px solid #22c55e44",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, color: "#e8eaf0" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#6b7280", textAlign: "center", lineHeight: 1.6 }}>
                  Your email client should have opened. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#e8eaf0", marginBottom: 4 }}>
                  Send a Message
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        color: "#4b5563",
                        fontFamily: "'JetBrains Mono',monospace",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Your Name
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        color: "#4b5563",
                        fontFamily: "'JetBrains Mono',monospace",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      color: "#4b5563",
                      fontFamily: "'JetBrains Mono',monospace",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Project Budget
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    style={{ color: form.budget ? "#e8eaf0" : "#4b5563" }}
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option value="< ₹10k">Below ₹10,000</option>
                    <option value="₹10k–₹50k">₹10,000 – ₹50,000</option>
                    <option value="₹50k–₹1L">₹50,000 – ₹1,00,000</option>
                    <option value="₹1L+">₹1,00,000+</option>
                    <option value="Full-time role">Looking to hire full-time</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 11,
                      color: "#4b5563",
                      fontFamily: "'JetBrains Mono',monospace",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project or role..."
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "#22c55e",
                    color: "#080b0f",
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "16px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    marginTop: 4,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#16a34a";
                    e.currentTarget.style.boxShadow = "0 8px 30px #22c55e33";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#22c55e";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: "#080b0f", borderTop: "1px solid #1f2937", padding: "44px 40px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em" }}>
          <span style={{ color: "#22c55e" }}>D</span>ivy<span style={{ color: "#22c55e" }}>.</span>
        </div>
        <p style={{ fontSize: 13, color: "#374151", fontFamily: "'JetBrains Mono',monospace" }}>
          © {new Date().getFullYear()} Divy Dadhich — Full Stack Developer, Jaipur IN
        </p>
        <div className="flex-center" style={{ gap: 8 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              display: "block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ fontSize: 12, color: "#22c55e", fontFamily: "'JetBrains Mono',monospace" }}>
            Available now
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const progress = useScrollProgress();

  return (
    <div style={{ background: "#080b0f", minHeight: "100vh" }}>
      <GlobalStyles />
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar scrollProgress={progress} />
      <Hero />
      <Ticker />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}