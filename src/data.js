// data.js — all static content for the portfolio, sourced from Divy's resume.
// Edit this file to update copy/content without touching component logic.

export const PROFILE = {
  name: "Divy Dadhich",
  role: "Full Stack Developer",
  location: "Bengaluru, Karnataka, India",
  email: "divydadhich1234@gmail.com",
  phone: "+91 7073091731",
  linkedin: "https://linkedin.com/in/divydadhich",
  github: "https://github.com/divydadhich",
  liveSite: "https://portfolio-xi-bay-28.vercel.app",
  summary:
    "Full Stack Developer with production experience building MERN applications and SaaS platforms — React.js, Node.js, Express.js, MongoDB, JWT, RBAC, Socket.io, and AWS S3 — owning features end-to-end from requirements to deployment.",
};

// Boot-sequence lines for the hero terminal animation.
export const BOOT_LINES = [
  { prompt: "whoami", output: "divy_dadhich — full_stack_developer" },
  { prompt: "cat role.txt", output: "MERN Stack · React · Node · Express · MongoDB" },
  { prompt: "log --latest", output: "shipped XOTO.ae @ Kotibox Global Technologies (Nov'25–Aug'26)" },
];

// Live "system status" panel in the hero.
export const SYSTEM_STATS = [
  { label: "Role-based dashboards shipped", value: 7, suffix: "+" },
  { label: "Business events automated", value: 15, suffix: "+" },
  { label: "UI dev time reduced", value: 30, suffix: "%" },
  { label: "Months of production experience", value: 10, suffix: "+" },
];

export const TOOL_LIST = [
  "React.js", "Redux", "Tailwind CSS", "Ant Design", "JavaScript", "Node.js",
  "Express.js", "REST APIs", "MongoDB", "JWT", "RBAC", "Socket.io", "AWS S3",
  "Git", "Postman", "SQL",
];

export const SKILLS = [
  { name: "JavaScript", level: 92, category: "Language" },
  { name: "SQL", level: 78, category: "Language" },
  { name: "React.js", level: 92, category: "Frontend" },
  { name: "Redux", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Ant Design", level: 82, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Express.js", level: 88, category: "Backend" },
  { name: "REST APIs", level: 90, category: "Backend" },
  { name: "JWT", level: 86, category: "Backend" },
  { name: "RBAC", level: 85, category: "Backend" },
  { name: "MongoDB", level: 84, category: "Database" },
  { name: "Socket.io", level: 80, category: "Tools" },
  { name: "AWS S3", level: 78, category: "Tools" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "Postman", level: 88, category: "Tools" },
];

export const SKILL_CATEGORIES = ["All", "Language", "Frontend", "Backend", "Database", "Tools"];

export const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Kotibox Global Technologies",
    period: "Nov 2025 — Aug 2026",
    location: "Jaipur, Rajasthan",
    status: "past",
    bullets: [
      "Developed XOTO.ae, a production real-estate SaaS platform with XOTO Grid (property marketplace) and XOTO Vault (partner ecosystem), supporting 7+ role-based dashboards.",
      "Built REST APIs, RBAC workflows, and cron-based notifications across 15+ business events.",
      "Shipped reusable React components, cutting UI development time by 30%.",
    ],
  },
  {
    role: "MERN Stack Developer",
    company: "Global IT Providers",
    period: "Mar 2025 — Sep 2025",
    location: "Jaipur, Rajasthan",
    status: "past",
    bullets: [
      "Built MERN applications with RESTful APIs, JWT authentication, and role-based authorization.",
      "Optimized MongoDB queries and schema design to improve API endpoint response times.",
    ],
  },
];

export const PROJECTS = [
  {
    title: "XOTO.ae",
    tag: "Production Real-Estate SaaS",
    description:
      "End-to-end features across XOTO Grid and XOTO Vault — property listings, lead management, partner/user management, commission tracking, notifications, and RBAC workflows for a UAE real-estate brand.",
    highlights: [
      "REST APIs, Socket.io real-time communication, and AWS S3 file uploads",
      "Reusable React components for scalable, maintainable UI",
      "Designed and shipped the company website UI/UX from stakeholder requirements",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Ant Design", "Socket.io", "AWS S3"],
    link: "https://xoto.ae/",
  },
  {
    title: "Vani Voice Chat App",
    tag: "Live on Google Play",
    description:
      "Responsive React web pages backed by custom REST APIs, built as the web layer for a voice chat app and handed off live to the Flutter mobile team — now published and live on the Play Store.",
    highlights: [
      "Backend APIs for data handling and core application functionality",
      "Deployed to production with live URLs for cross-team integration",
      "Web layer stayed in sync with the mobile app as new voice-room features shipped",
      "Helped shape onboarding and profile flows later carried into the Android release",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    link: "https://play.google.com/store/apps/details?id=com.anantam.vanivoice",
  },
];

export const EDUCATION = {
  degree: "Bachelor of Technology, Computer Science",
  school: "Sobhasaria Group of Institutions",
  location: "Sikar, Rajasthan",
  period: "Oct 2021 — 2025",
};

export const CERTIFICATIONS = [
  { title: "Full Stack Web Development (MERN)", issuer: "Global IT Providers", date: "September 2025" },
  { title: "Web Designing", issuer: "Seldom India", date: "May 2023" },
];