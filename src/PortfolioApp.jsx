import { useEffect, useRef, useState } from "react";

const SKILLS = [
  { name: "React.js", level: 92, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Express.js", level: 86, category: "Backend" },
  { name: "MongoDB", level: 84, category: "Database" },
  { name: "REST API", level: 90, category: "Backend" },
  { name: "JWT / RBAC", level: 87, category: "Backend" },
  { name: "AWS S3", level: 78, category: "Cloud" },
  { name: "Git & GitHub", level: 92, category: "Tools" },
];

const PROJECTS = [
  {
    title: "XOTO.ae",
    tag: "Live Real-Estate Platform",
    description: "Created a responsive MERN marketplace and partner portal for a UAE property brand with live dashboards and role-based access.",
    stack: ["React.js", "Tailwind CSS", "Node.js", "MongoDB"],
    link: "https://xoto.ae/",
  },
  {
    title: "Taazi Bhaaji",
    tag: "Quick Commerce",
    description: "Built a local commerce experience with real-time listings, order tracking, and a seller dashboard.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "Compostify",
    tag: "Sustainable Waste System",
    description: "Delivered a team-friendly waste management platform routing donations to NGOs and compost providers.",
    stack: ["React.js", "Express.js", "MongoDB"],
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Kotibox Global Technologies",
    period: "Nov 2025 – Present",
    location: "Jaipur, IN",
    bullets: [
      "Built XOTO Grid and XOTO Vault for live real-estate clients with a MERN product architecture.",
      "Implemented RBAC across 7 user personas and shipped role-specific dashboards.",
      "Delivered reusable React components, design tokens, and mobile-first responsive UI.",
    ],
  },
  {
    role: "MERN Stack Developer Trainee",
    company: "Global IT Providers",
    period: "Mar 2025 – Sep 2025",
    location: "Jaipur, IN",
    bullets: [
      "Designed REST APIs with JWT authentication and clean error handling.",
      "Optimized MongoDB schema and query performance for production workflows.",
      "Collaborated with team engineers to deliver maintainable, testable code.",
    ],
  },
  {
    role: "Web Designer Trainee",
    company: "Seldom India",
    period: "May 2023 – Jul 2023",
    location: "Jaipur, IN",
    bullets: [
      "Created responsive marketing sites using HTML, CSS, and JavaScript.",
      "Participated in design reviews and improved usability through iteration.",
    ],
  },
];

const SERVICES = [
  { icon: "🚀", title: "Product-ready MERN apps", description: "End-to-end development with polished UI, reliable backend logic, and deployment-ready performance." },
  { icon: "🎯", title: "Conversion-focused landing pages", description: "High-impact portfolio and pitch sites that feel professional, clear, and easy to navigate." },
  { icon: "🛡️", title: "Secure API architecture", description: "JWT auth, RBAC, and RESTful services built for stability, security, and growth." },
  { icon: "✨", title: "React UI systems", description: "Reusable components, clean spacing, and responsive design systems for consistent products." },
  { icon: "📈", title: "Performance tuning", description: "Fast Web Vitals, accessible markup, and strong frontend optimization for modern web standards." },
  { icon: "🤝", title: "Client-ready delivery", description: "Polished handoff, documentation, and communication for freelance and team projects." },
];

const TOOL_LIST = [
  "React", "Tailwind", "Node", "Express", "MongoDB", "JWT", "Redux", "Vite", "Git", "GitHub", "AWS", "REST API", "Figma", "SQL", "Web Vitals"
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const fullHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(fullHeight > 0 ? (scrollTop / fullHeight) * 100 : 0);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

function useTypewriter(words, typeSpeed = 80, deleteSpeed = 50, pause = 1800) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index % words.length];
    let timeout;

    if (!isDeleting && subIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => prev + 1);
    } else {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        setText(currentWord.slice(0, isDeleting ? subIndex - 1 : subIndex + 1));
      }, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function useInView(threshold = 0.2) {
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
  }, [threshold]);

  return [ref, inView];
}

function useCounter(target, duration = 1200, inView = false) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (!inView) return;
    let current = 1;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [inView, target, duration]);

  return value;
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (event) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${event.clientX - 4}px`;
        dotRef.current.style.top = `${event.clientY - 4}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${event.clientX - 18}px`;
        ringRef.current.style.top = `${event.clientY - 18}px`;
      }
    };

    const over = (event) => {
      if (event.target.closest("a, button, input, textarea, select")) {
        setHover(true);
      }
    };

    const out = () => setHover(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" style={{ transform: hover ? "scale(1.8)" : "scale(1)" }} />
      <div ref={ringRef} className={`cursor-ring hidden md:block ${hover ? "hover" : ""}`} />
    </>
  );
}

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.2 + 0.08,
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${particle.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />;
}

function generateResumeContent() {
  return `DIVY DADHICH
Full Stack Developer | MERN Specialist
Jaipur, Rajasthan, India
Email: divydadhich1234@gmail.com | Phone: +91 7073091731
LinkedIn: https://www.linkedin.com/in/divy-dadhich-1791702a3
GitHub: https://github.com/divydadhich

SUMMARY
Experienced MERN developer building polished portfolio products and client-facing web apps.

EXPERIENCE
Kotibox Global Technologies | Full Stack Developer | Nov 2025 – Present
Global IT Providers | MERN Stack Developer Trainee | Mar 2025 – Sep 2025
Seldom India | Web Designer Trainee | May 2023 – Jul 2023

SKILLS
React.js, Tailwind CSS, JavaScript, Node.js, Express.js, MongoDB, Redux, JWT, REST, AWS, Git
`;
}

function Navbar({ scrollProgress }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Experience", "Projects", "Services", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <button className="font-display text-xl font-black tracking-tight text-slate-900">Divy<span className="text-amber-500">.</span></button>
          <nav className="hidden items-center gap-8 md:flex text-sm uppercase tracking-[0.22em] text-slate-600">
            {links.map((link) => (
              <button key={link} onClick={() => handleScroll(link)} className="nav-link transition hover:text-slate-900">{link}</button>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="mailto:divydadhich1234@gmail.com" className="rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-700">Hire Me</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <button key={link} onClick={() => handleScroll(link)} className="text-left text-base font-semibold text-slate-700 transition hover:text-amber-600">{link}</button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function Hero() {
  const typed = useTypewriter(["Full Stack Developer", "React Engineer", "MERN Specialist", "API Architect"]);

  const downloadResume = () => {
    const content = generateResumeContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Divy_Dadhich_Resume.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-slate-50 pt-[88px] pb-24">
      <ParticleBackground />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute left-16 top-24 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-[0.98fr_0.88fr] lg:items-center">
            <div className="relative z-10">
              <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-950 md:text-6xl xl:text-7xl">
                Divy <span className="text-amber-500">Dadhich</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                I build polished MERN products, SaaS-ready dashboards, and launch-ready web platforms like <strong>XOTO.ae</strong>.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{typed}</span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Jaipur, India</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <button onClick={downloadResume} className="inline-flex items-center justify-center rounded-full bg-amber-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-700">Download Resume</button>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50">Work With Me</a>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "1+ yr", label: "Experience" },
                  { value: "5+", label: "Live Projects" },
                  { value: "24h", label: "Fast Reply" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center shadow-sm">
                    <p className="text-3xl font-black text-slate-950">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-lg shadow-slate-200/80">
              <div className="space-y-5">
                {[
                  { title: "Frontend", detail: "React, Tailwind, modern UI systems" },
                  { title: "Backend", detail: "Node, Express, MongoDB, secure APIs" },
                  { title: "Launch", detail: "Performance, accessibility, deployment" },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{item.title}</p>
                    <p className="mt-3 text-lg font-semibold text-slate-950">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <section className="bg-slate-100 py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 text-xs uppercase tracking-[0.35em] text-slate-500 md:px-10">
        {TOOL_LIST.map((tool) => (
          <span key={tool} className="rounded-full bg-white px-4 py-2 shadow-sm shadow-slate-200">{tool}</span>
        ))}
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView(0.18);
  const projectCount = useCounter(1, 1200, inView);

  return (
    <section id="about" className="bg-slate-50 py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-600">About</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Human-first code with product polish.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              I help founders and teams present their products with clean, modern interfaces and backend systems designed for real use.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-amber-500" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Why choose me</p>
                <p className="mt-4 text-slate-600 leading-7">
                  I combine strong React skills with backend clarity, thoughtful UI, and product-driven web performance for portfolio and SaaS launches.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Fast, transparent communication",
                "Responsive, accessible layouts",
                "Reusable, scalable components",
                "Production-ready deployment support",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] bg-slate-50 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Projects launched</p>
              <p className="mt-3 text-4xl font-black text-slate-950">{projectCount}+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView(0.12);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "Tools"];
  const filteredSkills = filter === "All" ? SKILLS : SKILLS.filter((skill) => skill.category === filter);

  return (
    <section id="skills" className="bg-white py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Skills</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Technical toolbox</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`rounded-full border px-4 py-2 text-sm transition ${filter === category ? "border-amber-500 bg-amber-50 text-slate-950" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{skill.name}</h3>
                  <p className="text-sm text-slate-500">{skill.category}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">{skill.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000" style={{ width: inView ? `${skill.level}%` : "0%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="bg-slate-50 py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Experience</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Career journey</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            {EXPERIENCE.map((item, index) => (
              <button
                key={item.role}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left rounded-3xl px-5 py-4 transition ${activeIndex === index ? "border border-amber-500 bg-amber-50 text-slate-950" : "border border-transparent bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50"}`}
              >
                <p className="font-semibold">{item.company}</p>
                <p className="mt-1 text-xs text-slate-500">{item.period}</p>
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-950">{EXPERIENCE[activeIndex].role}</h3>
                <p className="mt-2 text-sm text-slate-500">{EXPERIENCE[activeIndex].company} • {EXPERIENCE[activeIndex].location}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{EXPERIENCE[activeIndex].period}</span>
            </div>
            <div className="mt-8 space-y-4">
              {EXPERIENCE[activeIndex].bullets.map((bullet) => (
                <div key={bullet} className="flex gap-4 text-slate-600">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                  <p>{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="bg-white py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Projects</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Featured work</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600 md:text-base">
            High-value web products built for performance, polish, and business impact.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-500">{project.tag}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">Featured</span>
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <span key={tool} className="rounded-full bg-white px-3 py-1 text-[11px] text-slate-600 shadow-sm">{tool}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm font-semibold text-amber-600 transition hover:text-amber-700">
                  Visit project →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="bg-slate-50 py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Services</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">What I offer</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-5 text-3xl">{service.icon}</div>
              <h3 className="text-xl font-semibold text-slate-950">{service.title}</h3>
              <p className="mt-4 text-slate-600 leading-7">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please complete all required fields.");
      return;
    }
    const mailto = `mailto:divydadhich1234@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio inquiry")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`)}`;
    window.open(mailto, "_blank");
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="bg-white py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Contact</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Let’s build something exceptional.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              I’m available for selective freelance and full-time opportunities that need polished web products and modern engineering.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            {sent ? (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">✓</div>
                <h3 className="text-2xl font-black text-slate-950">Message sent!</h3>
                <p className="text-slate-600">I’ll follow up within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-900">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Project brief or role type" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Tell me about your product, budget, or timeline." />
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 py-12 px-6 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-slate-900">Divy Dadhich</p>
        <p>© {new Date().getFullYear()} Full Stack Developer. Built for growth and clarity.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const progress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500/20 selection:text-slate-900 overflow-x-hidden">
      <CustomCursor />
      <div className="absolute left-[-120px] top-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute right-[-160px] top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute inset-0 bg-noise opacity-0" />
      <Navbar scrollProgress={progress} />
      <main className="relative z-10">
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
