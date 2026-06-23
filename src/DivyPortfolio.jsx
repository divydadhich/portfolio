import { useState, useEffect, useRef } from "react";

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
    color: "#8b5cf6", // violet
    bullets: [ 
      "Built XOTO Grid (real-estate marketplace) and XOTO Vault (partner platform) for live business clients using the full MERN stack.", 
      "Architected RBAC systems spanning 7+ user personas — Admin, Agent, Advisor, Agency, Developer, Referral Partner, Customer — with fine-grained permission control.", 
      "Engineered reusable React component libraries with Ant Design + Tailwind, cutting dev time across projects.", 
      "Directly interfaced with clients: gathering requirements, presenting demos, and shipping iterative feedback into production." 
    ] 
  },
  { 
    role: "MERN Stack Developer Trainee", 
    company: "Global IT Providers", 
    period: "Mar 2025 – Sep 2025", 
    type: "Internship", 
    location: "Jaipur, IN", 
    color: "#ec4899", // rose
    bullets: [ 
      "Built full-stack MERN applications with RESTful APIs, JWT auth, and role-based authorization.", 
      "Integrated React frontends with Express/Node backends; optimized MongoDB queries and schema design for performance.", 
      "Shipped clean, modular, and maintainable code across collaborative team projects." 
    ] 
  },
  { 
    role: "Web Designer Trainee", 
    company: "Seldom India", 
    period: "May 2023 – Jul 2023", 
    type: "Internship", 
    location: "Jaipur, IN", 
    color: "#06b6d4", // cyan
    bullets: [ 
      "Designed and built responsive client websites using HTML, CSS, and JavaScript.", 
      "Collaborated on UI/UX improvements and adopted professional workflows and design critique cycles." 
    ] 
  },
];

const PROJECTS = [
  { name: "XOTO Grid", tagline: "Real-Estate Marketplace", description: "A large-scale real-estate platform with 7 role-specific dashboards, intelligent lead management with auto-classification, deduplication, and performance-based advisor assignment.", stack: ["React.js", "Node.js", "MongoDB", "Redux", "Socket.io", "AWS S3", "Express.js"], accent: "#10b981", metrics: ["7 User Roles", "Live Clients", "Real-time Updates"], featured: true },
  { name: "XOTO Vault", tagline: "Partner Ecosystem Platform", description: "Multi-step partner onboarding with KYC (Emirates ID, Passport, Trade License), structured lead pipelines, and automated commission tracking with Pending→Confirmed→Paid flow.", stack: ["React.js", "Node.js", "MongoDB", "Ant Design", "AWS S3"], accent: "#06b6d4", metrics: ["KYC Workflows", "Commission Engine", "Deal Verification"], featured: true },
  { name: "XOTO.ae", tagline: "Corporate Website", description: "Full UI/UX design and development for an official UAE real-estate brand — responsive, brand-aligned, and refined through multiple stakeholder feedback cycles.", stack: ["React.js", "Tailwind CSS", "JavaScript"], accent: "#6366f1", metrics: ["UAE Market", "Responsive", "Stakeholder Approved"], featured: false },
  { name: "Taazi Bhaazi", tagline: "Quick Commerce Platform", description: "A quick-commerce MERN platform bridging local produce sellers with nearby buyers — real-time product listings, live inventory, and delivery tracking.", stack: ["React.js", "Node.js", "Express.js", "MongoDB"], accent: "#f59e0b", metrics: ["Real-time Listings", "Delivery Tracking", "Seller Dashboard"], featured: false },
  { name: "Compostify", tagline: "Waste Management System", description: "Team-based food waste management platform routing donations to NGOs and organic waste to compost agencies — full MERN contribution on both frontend and backend.", stack: ["React.js", "Node.js", "Express.js", "MongoDB"], accent: "#14b8a6", metrics: ["NGO Integration", "Waste Routing", "Team Platform"], featured: false },
];

const SERVICES = [
  { icon: "⚡", title: "Full-Stack Web Apps", desc: "End-to-end MERN applications with complex business logic, authentication, and real-time capabilities." },
  { icon: "🏗️", title: "RBAC Architecture", desc: "Multi-role systems with fine-grained permissions, workflow automation, and admin dashboards." },
  { icon: "🔌", title: "REST API Design", desc: "Scalable, well-documented APIs with JWT auth, rate limiting, and optimized MongoDB queries." },
  { icon: "🎨", title: "React UI Development", desc: "Responsive, component-driven interfaces with Redux state management and design system integration." },
  { icon: "🚀", title: "MVP Development", desc: "Rapid prototype-to-production for startups — fast, functional, and built to scale." },
  { icon: "🔍", title: "Code Review & Refactor", desc: "Clean up legacy codebases, improve performance, add TypeScript, or modernize architecture." },
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
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
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

/* ─── CURSOR ─── */
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
      if (e.target.closest("a, button, [data-hover], select, input, textarea")) {
        setHover(true); 
      }
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
      <div ref={dotRef} className="cursor-dot hidden md:block" style={{ transform: hover ? "scale(2)" : "scale(1)" }} />
      <div ref={ringRef} className={`cursor-ring hidden md:block ${hover ? "hover" : ""}`} />
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

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width, 
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3, 
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5, 
      opacity: Math.random() * 0.4 + 0.1,
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
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) { 
          p.vx += dx * 0.00005; 
          p.vy += dy * 0.00005; 
        }
        p.vx *= 0.98; 
        p.vy *= 0.98;
        p.x += p.vx; 
        p.y += p.vy;
        if (p.x < 0) p.x = width; 
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; 
        if (p.y > height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`; // violet particles
        ctx.fill();
      });
      
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); 
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - d / 110)})`;
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

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

/* ─── RESUME DOWNLOAD HELPER ─── */
const generateResumeContent = () => {
  return `
DIVY DADHICH
Full Stack Developer | MERN Specialist
Jaipur, Rajasthan, India
Email: divydadhich1234@gmail.com | Phone: +91 7073091731
LinkedIn: https://www.linkedin.com/in/divy-dadhich-1791702a3
GitHub: https://github.com/divydadhich

────────────────────────────────────────
PROFESSIONAL SUMMARY
────────────────────────────────────────
Full Stack Developer with 1+ years of experience building production-grade MERN applications.
Specialises in complex RBAC systems, real-time features, and scalable REST APIs.
Currently working at Kotibox Global Technologies, delivering platforms for live real‑estate clients.

────────────────────────────────────────
EDUCATION
────────────────────────────────────────
B.Tech in Computer Science
Sobhasaria Group of Institutions, 2025

────────────────────────────────────────
TECHNICAL SKILLS
────────────────────────────────────────
Frontend : React.js, Redux, Tailwind CSS, Ant Design, Material UI, HTML5, CSS3, JavaScript
Backend  : Node.js, Express.js, REST API Design, JWT, RBAC, Socket.io
Database : MongoDB, SQL
Cloud    : AWS S3
Tools    : Git, GitHub, Postman, VS Code, Vite

────────────────────────────────────────
EXPERIENCE
────────────────────────────────────────
Full Stack Developer | Kotibox Global Technologies (Nov 2025 – Present | Jaipur, IN)
• Built XOTO Grid (real-estate marketplace) and XOTO Vault (partner platform) for live business clients.
• Architected RBAC systems with 7+ user personas (Admin, Agent, Advisor, Agency, Developer, Referral Partner, Customer).
• Created reusable React component libraries with Ant Design & Tailwind, reducing development time across projects.
• Interfaced directly with clients for requirements, demos, and iterative feedback.

MERN Stack Developer Trainee | Global IT Providers (Mar 2025 – Sep 2025 | Jaipur, IN)
• Developed full-stack MERN apps with JWT auth, role-based authorization, and RESTful APIs.
• Optimised MongoDB queries and collaborated on team projects with clean, modular code.

Web Designer Trainee | Seldom India (May 2023 – Jul 2023 | Jaipur, IN)
• Designed responsive client websites using HTML, CSS, and JavaScript.
• Collaborated on UI/UX improvements in a professional workflow.

────────────────────────────────────────
PROJECTS
────────────────────────────────────────
XOTO Grid (Real‑Estate Marketplace)
• 7 role-specific dashboards, intelligent lead management, real-time updates.
Stack: React.js, Node.js, MongoDB, Redux, Socket.io, AWS S3, Express.js

XOTO Vault (Partner Ecosystem Platform)
• Multi-step KYC onboarding, commission tracking (Pending→Confirmed→Paid).
Stack: React.js, Node.js, MongoDB, Ant Design, AWS S3

XOTO.ae (Corporate Website)
• Full UI/UX design & development for UAE real‑estate brand.
Stack: React.js, Tailwind CSS, JavaScript

Taazi Bhaazi (Quick Commerce Platform)
• Real-time product listings, delivery tracking, seller dashboard.
Stack: React.js, Node.js, Express.js, MongoDB

Compostify (Waste Management System)
• Food waste donation & compost routing platform.
Stack: React.js, Node.js, Express.js, MongoDB

────────────────────────────────────────
CONTACT
────────────────────────────────────────
Email: divydadhich1234@gmail.com
Phone: +91 7073091731
LinkedIn: https://www.linkedin.com/in/divy-dadhich-1791702a3
GitHub: https://github.com/divydadhich
  `.trim();
};

/* ─── NAVBAR ─── */
function Navbar({ scrollProgress }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Experience", "Projects", "Services", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const navbarHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth"
      });
    }
    setActive(id.toLowerCase());
    setMenuOpen(false);
  };

  return (
    <>
      <div className="progress-bar" style={{ width: scrollProgress + "%" }} />
      <nav className={`fixed top-0 left-0 right-0 z-[90] px-6 md:px-12 flex items-center justify-between h-[72px] transition-all duration-400 ${
        scrolled ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-900/60 shadow-lg shadow-violet-500/[0.01]" : "bg-transparent"
      }`}>
        <div className="font-display font-extrabold text-2xl tracking-tight text-white select-none">
          <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">D</span>ivy<span className="text-rose-500">.</span>
        </div>
        
        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((link) => (
            <li key={link}>
              <button 
                className={`nav-link text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 ${
                  active === link.toLowerCase() ? "text-violet-400 active" : "text-slate-400 hover:text-white"
                }`} 
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden md:block">
          <a 
            href="mailto:divydadhich1234@gmail.com?subject=Let's%20work%20together" 
            className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-violet-400 hover:bg-gradient-to-r hover:from-violet-600 hover:to-rose-600 hover:text-white font-display font-bold text-xs uppercase px-5 py-2.5 rounded-full tracking-wider transition-all duration-300 hover:border-violet-500 shadow-sm hover:shadow-violet-500/20"
          >
            Hire Me →
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden flex items-center justify-center border border-slate-800 hover:border-violet-500/50 bg-slate-950/50 rounded-lg p-2 text-slate-300 transition-colors duration-200"
        >
          {menuOpen ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 right-0 z-[80] md:hidden bg-slate-950/95 border-b border-slate-900 backdrop-blur-lg px-8 py-8 flex flex-col gap-5 shadow-2xl animate-fadeIn">
          {links.map((link) => (
            <button 
              key={link} 
              onClick={() => scrollTo(link)} 
              className="text-left font-display font-bold text-lg text-slate-200 hover:text-violet-400 py-1 transition-colors duration-200"
            >
              {link}
            </button>
          ))}
          <a 
            href="mailto:divydadhich1234@gmail.com?subject=Let's%20work%20together" 
            className="bg-gradient-to-r from-violet-600 to-rose-600 text-white text-center font-display font-bold py-3.5 rounded-xl text-sm transition-all hover:opacity-90 mt-2 shadow-lg shadow-violet-500/10"
          >
            Hire Me →
          </a>
        </div>
      )}
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  const typed = useTypewriter(["Full Stack Developer", "MERN Specialist", "React Engineer", "API Architect", "Freelance Developer"]);
  const handleCopyInfo = () => {
    navigator.clipboard.writeText("Divy Dadhich\nFull Stack Developer\nEmail: divydadhich1234@gmail.com\nPhone: +91 7073091731\nLocation: Jaipur, Rajasthan, India").then(() => {
      alert("Contact info copied to clipboard!");
    });
  };
  
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Divy Dadhich\nORG:Full Stack Developer\nTEL;TYPE=CELL:+91 7073091731\nEMAIL:divydadhich1234@gmail.com\nADR:;;Jaipur;Rajasthan;;;India\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; 
    a.download = "Divy_Dadhich.vcf"; 
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadResume = () => {
    const content = generateResumeContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; 
    a.download = "Divy_Dadhich_Resume.txt"; 
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-slate-950 pt-[72px] px-6 md:px-12">
      <ParticleBackground />
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="max-w-6xl mx-auto py-16 relative z-10 w-full">
        <div className="max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-8 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] text-violet-300 font-mono tracking-widest uppercase">Available for Full-time & Freelance</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight leading-[0.9] text-white mb-6">
            Divy<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Dadhich
            </span>
          </h1>

          {/* Subheading typewriter */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-violet-500 rounded" />
            <span className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
              {typed}
              <span className="animate-pulse text-violet-400 font-bold ml-1">|</span>
            </span>
          </div>

          {/* Bio Description */}
          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mb-10 font-light">
            I engineer production-grade MERN platforms — from custom real-estate marketplaces to high-trust partner portals. I write clean, robust code that scales, builds user trust, and solves complex business problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }} 
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-violet-600 to-rose-600 text-white font-display font-extrabold text-sm uppercase px-8 py-4 rounded-full shadow-lg shadow-violet-500/20 hover:shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              View Projects 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button 
              onClick={handleDownloadResume} 
              className="inline-flex items-center gap-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-display font-bold text-sm uppercase px-8 py-4 rounded-full transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> 
              Download CV
            </button>
          </div>

          {/* Interaction shortcuts */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button 
              onClick={handleCopyInfo} 
              className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800/80 hover:border-violet-500/30 text-slate-400 hover:text-violet-400 font-display font-semibold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200"
            >
              📋 Copy Info
            </button>
            <button 
              onClick={handleDownloadVCard} 
              className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800/80 hover:border-violet-500/30 text-slate-400 hover:text-violet-400 font-display font-semibold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200"
            >
              💾 Save Contact (vCard)
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-slate-900 pt-10">
            {[
              ["1+", "Years Exp."], 
              ["5+", "Live Projects"], 
              ["7+", "Roles Built"], 
              ["3", "Companies"]
            ].map(([number, label]) => (
              <div key={label} className="group">
                <div className="text-3xl md:text-4xl font-display font-black text-white group-hover:text-violet-400 transition-colors duration-300">{number}</div>
                <div className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-0 right-0 hidden sm:flex flex-col items-center gap-2.5 animate-fadeIn">
          <span className="text-[9px] text-slate-600 tracking-[0.25em] uppercase font-mono [writing-mode:vertical-rl]">Scroll down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-violet-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ─── TICKER ─── */
function Ticker() {
  return (
    <div className="bg-slate-950 border-y border-slate-900 py-4.5 overflow-hidden select-none">
      <div className="animate-marquee flex gap-12 w-max">
        {[...TOOLS, ...TOOLS].map((tool, idx) => (
          <span key={idx} className="text-xs text-slate-500 font-mono tracking-wider whitespace-nowrap flex items-center gap-4">
            {tool}
            <span className="text-violet-500/60 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ─── */
function About() {
  const [ref, inView] = useInView();
  const projectCount = useCounter(5, 1200, inView);

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Visual Mockup */}
        <div ref={ref} className="relative">
          {/* Card Mockup */}
          <div className="w-full aspect-[4/5] bg-slate-900/40 border border-slate-800 rounded-3xl flex flex-col relative overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Header circles */}
            <div className="flex gap-1.5 p-5 border-b border-slate-900/60">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            </div>
            
            {/* Code syntax */}
            <div className="flex-1 p-8 font-mono text-[11px] leading-relaxed text-slate-500 select-none overflow-hidden">
              {["const Divy = {", '  role: "Full Stack Dev",', '  stack: ["MERN"],', '  location: "Jaipur, IN",', '  status: "Available",', '  experience: "1+ yrs",', "};", "", "export default Divy;"].map((line, i) => (
                <div key={i} className={i === 0 || i === 6 || i === 8 ? "text-violet-400/80" : "pl-4 text-slate-500"}>{line}</div>
              ))}
            </div>

            {/* Profile Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-[1px] p-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500/20 to-rose-500/20 border-2 border-violet-500/30 flex items-center justify-center mb-4 relative">
                <div className="absolute inset-1.5 rounded-full bg-slate-950 flex items-center justify-center">
                  <span className="font-display font-extrabold text-2xl text-violet-400">DD</span>
                </div>
              </div>
              <h3 className="font-display font-extrabold text-lg text-white">Divy Dadhich</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">Full Stack Developer</p>
            </div>

            {/* Floating Tags */}
            <div className="absolute top-8 right-6 bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2 text-[11px] text-violet-400 font-display font-extrabold shadow-lg">
              🟢 Open to Work
            </div>
            <div className="absolute bottom-8 left-6 bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-2 text-[11px] text-slate-300 font-mono shadow-lg">
              Jaipur, IN 📍
            </div>
          </div>

          {/* Metrics Float */}
          <div className="absolute -bottom-6 -right-4 bg-slate-900 border border-violet-500/10 rounded-2xl p-5 text-center shadow-2xl min-w-[120px]">
            <div className="font-display font-black text-3xl text-violet-400 leading-none">{projectCount}+</div>
            <div className="text-[9px] text-slate-500 tracking-wider font-mono uppercase mt-1">Projects</div>
          </div>
        </div>

        {/* Text Area */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-xs text-violet-400 font-mono tracking-widest uppercase">About Me</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[1.05] text-white mb-6">
            I engineer products that <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent font-extrabold">actually ship.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-5 font-light">
            I'm a Full Stack Developer from Jaipur, India. Currently, I build production-grade MERN platforms at Kotibox Global Technologies. My experience spans live marketplace systems, partner pipeline hubs, and role-specific dashboards.
          </p>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-8 font-light">
            I take end-to-end responsibility — translating user goals into secure database logic, writing responsive components, and releasing updates into staging/production.
          </p>

          {/* Quick specs grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: "Education", val: "B.Tech CS, Sobhasaria, 2025" }, 
              { label: "Location", val: "Jaipur, Rajasthan, India" }, 
              { label: "Email", val: "divydadhich1234@gmail.com" }, 
              { label: "Phone", val: "+91 7073091731" }
            ].map(({ label, val }) => (
              <div key={label} className="bg-slate-900/30 border border-slate-900 rounded-xl p-3.5">
                <div className="text-[9px] text-slate-500 font-mono tracking-wider uppercase mb-1">{label}</div>
                <div className="text-[12px] text-slate-300 font-medium truncate">{val}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex items-center flex-wrap gap-3">
            {[
              ["GitHub", "https://github.com/divydadhich"], 
              ["LinkedIn", "https://www.linkedin.com/in/divy-dadhich-1791702a3"]
            ].map(([name, href]) => (
              <a 
                key={name} 
                href={href} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-slate-900 border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-violet-500/30 font-display font-semibold text-xs tracking-wider px-5 py-2.5 rounded-full transition-all duration-200"
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

/* ─── SKILLS ─── */
function Skills() {
  const [ref, inView] = useInView(0.08);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Frontend", "Backend", "Database", "Realtime", "Cloud", "Tools"];
  const filteredSkills = filter === "All" ? SKILLS_DATA : SKILLS_DATA.filter((s) => s.cat === filter);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Technical Skills</span>
        </div>
        
        {/* Header content and switcher */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white">
            My Tech <span className="text-emerald-400">Arsenal</span>
          </h2>
          
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 ${
                  filter === cat 
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                    : "bg-transparent border border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill grid cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div 
              key={skill.name} 
              className="bg-slate-900 border border-slate-900 rounded-2xl p-5 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/[0.02] transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-display font-bold text-[15px] text-white group-hover:text-emerald-400 transition-colors duration-200">{skill.name}</h3>
                  <span className="text-[9px] text-slate-600 font-mono uppercase tracking-wider mt-0.5 block">{skill.cat}</span>
                </div>
                <span className="font-display font-extrabold text-lg text-emerald-500/70 group-hover:text-emerald-400 transition-colors duration-200">{skill.level}%</span>
              </div>
              <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-[1200ms] ease-out" 
                  style={{ 
                    width: inView ? skill.level + "%" : "0%",
                    transitionDelay: `${idx * 40}ms`
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

/* ─── EXPERIENCE ─── */
function Experience() {
  const [active, setActive] = useState(0);
  
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Career Timeline</span>
        </div>
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-16">
          Where I've <span className="text-emerald-400">Worked</span>
        </h2>
        
        {/* Layout switcher */}
        <div className="grid md:grid-cols-[260px_1fr] gap-8">
          {/* Timeline switch selectors */}
          <div className="timeline-node relative flex flex-col gap-2">
            {EXPERIENCE.map((exp, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)} 
                className={`text-left bg-transparent border rounded-xl px-5 py-4 pl-10 relative transition-all duration-300 z-10 ${
                  active === i 
                    ? "border-emerald-500/20 bg-slate-900/50 shadow-md shadow-emerald-500/[0.01]" 
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                  active === i 
                    ? "bg-emerald-400 border-emerald-400" 
                    : "bg-transparent border-slate-700"
                }`} />
                <div className={`font-display font-bold text-sm leading-tight transition-colors duration-300 ${active === i ? "text-white" : ""}`}>{exp.company}</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">{exp.period}</div>
              </button>
            ))}
          </div>

          {/* Experience detailed output panel */}
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <h3 className="font-display font-extrabold text-xl text-white leading-snug">{EXPERIENCE[active].role}</h3>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="text-sm font-semibold font-display text-emerald-400">{EXPERIENCE[active].company}</span>
                  <span className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{EXPERIENCE[active].type}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">{EXPERIENCE[active].location} · {EXPERIENCE[active].period}</div>
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-slate-900 mb-6" />
            
            {/* Bullets */}
            <ul className="flex flex-col gap-4 list-none pl-0">
              {EXPERIENCE[active].bullets.map((b, i) => (
                <li key={i} className="flex gap-4 text-slate-400 text-[13.5px] leading-relaxed font-light">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  
  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Portfolio Gallery</span>
        </div>
        <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white">
            Things I've <span className="text-emerald-400">Built</span>
          </h2>
          <p className="text-slate-500 max-w-xs text-xs md:text-sm font-light leading-relaxed">
            Real-world web environments constructed with performance, responsiveness, and clear role privileges.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((proj, i) => (
            <div 
              key={proj.name} 
              className="bg-slate-900/30 border border-slate-900 hover:border-emerald-500/20 rounded-3xl p-8 transition-all duration-300 relative overflow-hidden group shadow-xl"
            >
              {/* Radial gradient ambient background */}
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/[0.02] group-hover:bg-emerald-500/[0.05] pointer-events-none rounded-full blur-[50px] transition-all duration-300" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-700 font-mono">0{i + 1}</span>
              </div>
              
              <h3 className="font-display font-black text-xl text-white mb-1 group-hover:text-emerald-400 transition-colors duration-200">{proj.name}</h3>
              <div className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase mb-4">{proj.tagline}</div>
              <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed mb-6 truncate-3-lines">{proj.description}</p>
              
              {/* Metrics */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.metrics.map((m) => (
                  <span key={m} className="text-[9px] font-mono bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80 px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map((s) => (
                  <span key={s} className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Smaller Projects Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {rest.map((proj, i) => (
            <div 
              key={proj.name} 
              className="bg-slate-900/30 border border-slate-900 hover:border-emerald-500/20 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-emerald-500/[0.01] pointer-events-none rounded-full blur-[40px]" />
              <div className="flex justify-between items-center mb-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[10px] text-slate-700 font-mono">0{i + 3}</span>
              </div>
              
              <h3 className="font-display font-extrabold text-base text-white mb-0.5 group-hover:text-emerald-400 transition-colors duration-200">{proj.name}</h3>
              <div className="text-[9px] text-emerald-400/90 font-mono tracking-widest uppercase mb-3">{proj.tagline}</div>
              <p className="text-slate-400 text-xs font-light leading-relaxed mb-5 min-h-[50px]">{proj.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {proj.stack.slice(0, 4).map((s) => (
                  <span key={s} className="text-[8px] font-mono bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 rounded">
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

/* ─── SERVICES ─── */
function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Service Capabilities</span>
        </div>
        
        <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white leading-tight">
            What I Can<br /><span className="text-emerald-400">Do For You</span>
          </h2>
          <p className="text-slate-500 max-w-xs text-xs md:text-sm font-light leading-relaxed">
            From single-page MVP prototyping to modular role-restricted system architecture.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SERVICES.map((svc) => (
            <div 
              key={svc.title} 
              className="bg-slate-900 border border-slate-900 hover:border-emerald-500/20 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 flex gap-5 items-start group shadow-md"
            >
              <div className="text-3xl filter saturate-75 select-none">{svc.icon}</div>
              <div>
                <h3 className="font-display font-extrabold text-[15px] text-white mb-2 group-hover:text-emerald-400 transition-colors duration-200">{svc.title}</h3>
                <p className="text-slate-400 text-xs md:text-[13px] font-light leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Work callout banner */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/10 rounded-3xl p-10 md:p-12 flex items-center justify-between flex-wrap gap-8 shadow-xl">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-white mb-2">Ready to pitch a prototype?</h3>
            <p className="text-slate-400 text-xs md:text-sm font-light">Let's craft the dashboard or marketplace you need. I react within 24 hours.</p>
          </div>
          <a 
            href="mailto:divydadhich1234@gmail.com" 
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-black text-sm uppercase px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 whitespace-nowrap"
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all required fields.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget || "N/A"}\n\nMessage:\n${form.message}`);
    window.open(`mailto:divydadhich1234@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Get In Touch</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none text-white mb-4">
            Let's build <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">something great</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-xs md:text-sm font-light leading-relaxed">
            I'm currently accepting selective freelance projects and full-time MERN engineering roles.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-10">
          {/* Quick info column */}
          <div className="flex flex-col gap-4">
            {[
              { label: "Email", val: "divydadhich1234@gmail.com", href: "mailto:divydadhich1234@gmail.com", iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
              { label: "Phone", val: "+91 7073091731", href: "tel:+917073091731", iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
              { label: "Location", val: "Jaipur, Rajasthan, India", href: null, iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
            ].map((c) => (
              <div 
                key={c.label} 
                className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-500/10 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5"><path d={c.iconPath} /></svg>
                </div>
                <div className="overflow-hidden">
                  <div className="text-[9px] text-slate-500 font-mono tracking-wider uppercase mb-0.5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-[13px] text-slate-200 hover:text-emerald-400 font-medium truncate block">{c.val}</a>
                  ) : (
                    <span className="text-[13px] text-slate-200 font-medium truncate block">{c.val}</span>
                  )}
                </div>
              </div>
            ))}
            
            {/* Social connection cards */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6">
              <div className="text-[9px] text-slate-500 font-mono tracking-wider uppercase mb-4">Find me on</div>
              <div className="flex items-center gap-2.5">
                {[
                  { name: "GitHub", href: "https://github.com/divydadhich", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/divy-dadhich-1791702a3", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
                ].map((s) => (
                  <a 
                    key={s.name} 
                    href={s.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label={s.name} 
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 transition-all duration-250 shadow-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-2">Message Dispatched!</h3>
                <p className="text-slate-400 text-xs max-w-[240px] leading-relaxed">
                  Your mail app was triggered. I will write back to you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-display font-black text-lg text-white mb-1">Send a Message</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={form.name} 
                      onChange={handleChange} 
                      placeholder="John Doe" 
                      className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs md:text-sm text-white outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Your Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={form.email} 
                      onChange={handleChange} 
                      placeholder="john@company.com" 
                      className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs md:text-sm text-white outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Project Budget / Role Type</label>
                  <select 
                    name="budget" 
                    value={form.budget} 
                    onChange={handleChange}
                    className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-400 outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="< ₹10k">Below ₹10,000</option>
                    <option value="₹10k–₹50k">₹10,000 – ₹50,000</option>
                    <option value="₹50k–₹1L">₹50,000 – ₹1,00,000</option>
                    <option value="₹1L+">₹1,00,000+</option>
                    <option value="Full-time hire">Looking to hire full-time</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Message Details *</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4} 
                    value={form.message} 
                    onChange={handleChange} 
                    placeholder="Tell me about your product specifications or role details..." 
                    className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs md:text-sm text-white outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none min-h-[100px]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-black text-sm uppercase px-6 py-4.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
                >
                  Send Message 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
                </button>
              </form>
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
    <footer className="bg-slate-950 border-t border-slate-900 py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-6">
        <div className="font-display font-extrabold text-xl tracking-tight text-white">
          <span className="text-emerald-500">D</span>ivy<span className="text-emerald-500">.</span>
        </div>
        <p className="text-[11px] text-slate-600 font-mono">
          © {new Date().getFullYear()} Divy Dadhich — Full Stack Developer, Jaipur IN
        </p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-emerald-400/80 font-mono">Active</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const progress = useScrollProgress();
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Ambient background glows */}
      <div className="absolute top-[10%] right-[10%] w-[380px] h-[380px] bg-emerald-500/[0.04] rounded-full blur-[110px] pointer-events-none animate-pulse-slow z-0" />
      <div className="absolute top-[40%] left-[5%] w-[480px] h-[480px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none animate-float-slow z-0" />
      <div className="absolute bottom-[10%] right-[5%] w-[380px] h-[380px] bg-indigo-500/[0.04] rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="noise-overlay" />
      <CustomCursor />
      
      <div className="relative z-10">
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
    </div>
  );
}