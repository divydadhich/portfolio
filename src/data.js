// data.js — comprehensive portfolio data for Divy Dadhich

export const PROFILE = {
  name: "Divy Dadhich",
  title: "Full Stack Developer & MERN Architect",
  tagline: "Engineering production SaaS, real-time engines, and mission-critical web platforms.",
  location: "Bengaluru, Karnataka, India",
  email: "divydadhich1234@gmail.com",
  phone: "+91 7073091731",
  linkedin: "https://linkedin.com/in/divydadhich",
  github: "https://github.com/divydadhich",
  liveSite: "https://portfolio-xi-bay-28.vercel.app",
  status: "Available for Elite Full-Stack & MERN Roles",
  summary:
    "Full Stack Developer with production experience shipping enterprise MERN applications and high-throughput SaaS platforms. Proven track record architecting 7+ role-based dashboards, automated business event engines across 15+ events, and real-time systems with React, Node.js, Express, MongoDB, Socket.io, and AWS S3.",
  yearsExperience: "1+ Years In Production",
};

export const SYSTEM_METRICS = [
  { label: "Production Dashboards", value: "7+", detail: "RBAC Admin, Agent, Agency, Partner tiers", icon: "LayoutDashboard" },
  { label: "Automated Workflows", value: "15+", detail: "Cron + event-driven business triggers", icon: "Zap" },
  { label: "UI Dev Acceleration", value: "30%", detail: "Engineered modular component library", icon: "TrendingUp" },
  { label: "Production Uptime", value: "99.9%", detail: "Zero-downtime shipping & REST APIs", icon: "ShieldCheck" },
];

export const SKILL_CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Database & Cloud",
  "Architecture & Security",
  "Tools",
];

export const SKILLS = [
  { name: "React.js", category: "Frontend", level: 95, icon: "Atom", experience: "2+ yrs", highlight: "Modular component architecture, custom hooks, SSR & state management" },
  { name: "Node.js", category: "Backend", level: 92, icon: "Server", experience: "2+ yrs", highlight: "Async event loops, micro-services, high concurrency APIs" },
  { name: "Express.js", category: "Backend", level: 92, icon: "Cpu", experience: "2+ yrs", highlight: "RESTful architecture, custom middleware, error handling pipelines" },
  { name: "MongoDB", category: "Database & Cloud", level: 88, icon: "Database", experience: "2+ yrs", highlight: "Aggregation pipelines, indexing, schema modeling, Mongoose" },
  { name: "JavaScript (ES6+)", category: "Frontend", level: 96, icon: "Code", experience: "3+ yrs", highlight: "Closures, async/await, prototypes, functional programming" },
  { name: "Tailwind CSS", category: "Frontend", level: 95, icon: "Palette", experience: "2+ yrs", highlight: "Responsive layouts, custom design systems, dark mode, animations" },
  { name: "Redux & RTK", category: "Frontend", level: 88, icon: "Layers", experience: "2+ yrs", highlight: "Global state slices, thunks, selectors, optimistic updates" },
  { name: "Socket.io", category: "Backend", level: 86, icon: "Radio", experience: "1.5 yrs", highlight: "Bidirectional real-time websockets, rooms, voice/chat channels" },
  { name: "AWS S3", category: "Database & Cloud", level: 84, icon: "Cloud", experience: "1.5 yrs", highlight: "Presigned URLs, secure asset storage, CDN integration" },
  { name: "JWT & Auth Security", category: "Architecture & Security", level: 90, icon: "Lock", experience: "2+ yrs", highlight: "Access/refresh token lifecycles, CSRF/XSS protection" },
  { name: "RBAC Architecture", category: "Architecture & Security", level: 92, icon: "Shield", experience: "2+ yrs", highlight: "Hierarchical permissions across 7+ user tiers" },
  { name: "Ant Design & UI Libs", category: "Frontend", level: 88, icon: "Sparkles", experience: "2+ yrs", highlight: "Complex enterprise tables, drawers, forms & modals" },
  { name: "RESTful API Design", category: "Backend", level: 94, icon: "Network", experience: "2+ yrs", highlight: "Idempotent endpoints, HTTP status standards, OpenAPI specs" },
  { name: "SQL", category: "Database & Cloud", level: 80, icon: "FileSpreadsheet", experience: "1.5 yrs", highlight: "Relational queries, joins, transactions & normalization" },
  { name: "Git & GitHub", category: "Tools", level: 92, icon: "GitBranch", experience: "3+ yrs", highlight: "Branching strategies, CI/CD actions, merge conflict resolution" },
  { name: "Postman", category: "Tools", level: 90, icon: "Terminal", experience: "2+ yrs", highlight: "API automated testing suites, environment variables, mock servers" },
];

export const PROJECTS = [
  {
    id: "xoto",
    title: "XOTO.ae — Production Real-Estate SaaS Platform",
    tagline: "High-scale UAE real-estate ecosystem powering property listings, commissions, and multi-tier workflows.",
    category: "Production SaaS",
    featured: true,
    badge: "LIVE PRODUCTION PLATFORM",
    badgeColor: "emerald",
    link: "https://xoto.ae/",
    role: "Full Stack Developer",
    timeline: "Nov 2025 — Aug 2026",
    overview:
      "Engineered end-to-end features for XOTO.ae across two primary platforms: XOTO Grid (public property marketplace) and XOTO Vault (private partner/broker ecosystem). Architected 7+ role-based permission tiers and automated 15+ business event notifications.",
    metrics: [
      { label: "Role Personas", value: "7 Tiers" },
      { label: "Business Events", value: "15+ Auto" },
      { label: "UI Dev Speed", value: "+30%" },
      { label: "Daily Transactions", value: "Live UAE" },
    ],
    features: [
      "Role-Based Access Control (RBAC) across Admin, Agent, Advisor, Agency, Developer, Referral Partner, and Customer.",
      "Real-time event-driven notifications powered by Socket.io and background cron engines.",
      "High-speed secure document and media upload pipelines directly to AWS S3.",
      "Engineered reusable React component architecture that reduced overall frontend engineering turnaround by 30%.",
      "Designed and delivered interactive real-estate analytics dashboards with Ant Design and Tailwind CSS.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Ant Design", "Socket.io", "AWS S3", "Tailwind CSS"],
    architecture: {
      client: "React 19 + Redux Toolkit + Ant Design",
      api: "Express.js REST APIs with JWT & RBAC Middleware",
      realtime: "Socket.io Bidirectional Room Clusters",
      storage: "MongoDB Atlas + AWS S3 Encrypted Buckets",
    },
  },
  {
    id: "vani",
    title: "Vani Voice Chat App — Real-Time Voice Platform",
    tagline: "Production voice chat application with responsive web architecture, live on Google Play Store.",
    category: "Real-Time / Mobile",
    featured: true,
    badge: "LIVE ON GOOGLE PLAY",
    badgeColor: "cyan",
    link: "https://play.google.com/store/apps/details?id=com.anantam.vanivoice",
    role: "Full Stack & API Engineer",
    timeline: "Production Delivery",
    overview:
      "Architected the web interface and robust RESTful API layer for the Vani Voice Chat application. Partnered closely with Flutter mobile engineers to integrate real-time voice room channels, user presence, and authentication flows into production.",
    metrics: [
      { label: "Platform", value: "Android & Web" },
      { label: "Protocol", value: "REST + Sockets" },
      { label: "State Sync", value: "Real-Time" },
      { label: "Security", value: "JWT Auth" },
    ],
    features: [
      "Designed responsive React web portals synchronizing live state with Android mobile clients.",
      "Built resilient Node.js backend endpoints for user onboarding, profile customization, and room management.",
      "Engineered low-latency data handoffs ensuring cross-platform voice-room synchronization.",
      "Implemented JWT security tokens with automatic token refresh mechanisms.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Socket.io", "Flutter Bridge"],
    architecture: {
      client: "Responsive React Web Layer + Flutter Mobile Bridge",
      api: "Node.js High-Throughput REST Gateway",
      realtime: "WebSockets for Room State & Presence",
      storage: "MongoDB Cluster with Optimized Indexes",
    },
  },
  {
    id: "rbac-engine",
    title: "Enterprise RBAC & Auth Security Engine",
    tagline: "Production-grade hierarchical authorization and session management micro-framework.",
    category: "Security & Cloud",
    featured: false,
    badge: "CORE ARCHITECTURE",
    badgeColor: "violet",
    link: "https://github.com/divydadhich",
    role: "System Architect",
    timeline: "Core System",
    overview:
      "A battle-tested authorization framework supporting granular resource-level permissions, dynamic role inheritance, and cryptographically secure token management.",
    metrics: [
      { label: "Auth Speed", value: "< 15ms" },
      { label: "Security Tier", value: "Enterprise" },
      { label: "Scalability", value: "Multi-Tenant" },
      { label: "Coverage", value: "100% RBAC" },
    ],
    features: [
      "Hierarchical permission inheritance (SuperAdmin > Admin > Manager > User).",
      "Cryptographic HMAC SHA-256 JWT validation with blacklisted refresh token rotation.",
      "Middleware-level rate limiting, XSS sanitization, and strict CORS configuration.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "Crypto", "Redis"],
    architecture: {
      client: "Client-agnostic Bearer Token Flow",
      api: "Express Pipeline with Interceptor Guards",
      realtime: "Session Revocation Broadcasts",
      storage: "Encrypted Token Store in MongoDB",
    },
  },
];

export const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Kotibox Global Technologies",
    period: "Nov 2025 — Aug 2026",
    location: "Jaipur, Rajasthan, India",
    type: "Full-Time",
    status: "Production Milestone",
    color: "#06b6d4",
    highlights: [
      "Architected and delivered XOTO.ae, a premier real-estate SaaS platform featuring XOTO Grid and XOTO Vault.",
      "Engineered 7+ distinct role-based dashboard portals (Super Admin, Agent, Advisor, Agency, Developer, Partner, Customer) with strict RBAC guarantees.",
      "Designed and automated cron-based notification pipelines across 15+ high-priority business events.",
      "Integrated AWS S3 secure media asset pipelines and Socket.io bidirectional channels for live chat and notifications.",
      "Built a unified, reusable React component architecture cutting UI turnaround times by 30%.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Global IT Providers",
    period: "Mar 2025 — Sep 2025",
    location: "Jaipur, Rajasthan, India",
    type: "Professional Engineering",
    status: "Completed",
    color: "#8b5cf6",
    highlights: [
      "Developed robust MERN applications with clean RESTful API contracts, JWT authentication, and database schemas.",
      "Profiled and optimized complex MongoDB query aggregations, significantly improving endpoint response times.",
      "Implemented responsive, accessible frontend interfaces in React.js and modern CSS frameworks.",
      "Collaborated using Git, Postman, and agile sprints to deliver production-ready releases.",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Technology — Computer Science & Engineering",
  school: "Sobhasaria Group of Institutions",
  location: "Sikar, Rajasthan, India",
  period: "Oct 2021 — 2025",
  honors: "Focused on Distributed Systems, Web Architecture & Data Structures",
};

export const CERTIFICATIONS = [
  {
    title: "Full Stack Web Development (MERN)",
    issuer: "Global IT Providers",
    date: "September 2025",
    badge: "VERIFIED CREDENTIAL",
  },
  {
    title: "Modern Web Designing & UI/UX",
    issuer: "Seldom India",
    date: "May 2023",
    badge: "CERTIFIED",
  },
];

export const TERMINAL_COMMANDS = {
  help: "Available commands: whoami, skills, projects, experience, contact, stats, clear, matrix, hire",
  whoami: "Divy Dadhich — Full Stack MERN Architect & SaaS Platform Specialist based in Bengaluru, India.",
  skills: "Core: React.js, Node.js, Express.js, MongoDB, Socket.io, AWS S3, Redux, Tailwind CSS, RBAC, JWT",
  projects: "Featured: XOTO.ae (Production Real-Estate SaaS), Vani Voice Chat (Google Play Live)",
  experience: "Kotibox Global Technologies (Full Stack Dev) | Global IT Providers (MERN Stack Dev)",
  stats: "7+ Dashboards Shipped | 15+ Automated Workflows | 30% UI Dev Time Cut | 99.9% Uptime",
  contact: "Email: divydadhich1234@gmail.com | Phone: +91 7073091731 | LinkedIn: divydadhich | GitHub: divydadhich",
  hire: "Status: ACTIVELY INTERVIEWING. Ready to deploy production value to your engineering team immediately.",
};