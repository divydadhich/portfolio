const heroSkills = [
  { title: 'React.js', value: 'UI and component architecture' },
  { title: 'Tailwind CSS', value: 'Modern responsive design' },
  { title: 'JavaScript', value: 'Clean, maintainable logic' },
  { title: 'Figma handoff', value: 'Pixel-perfect implementation' },
]

const experience = [
  {
    role: 'Frontend Developer',
    company: 'Freelance clients',
    period: '2024 - Present',
    detail: 'Built custom React websites for agencies, startups, and personal brands.',
  },
  {
    role: 'UI Developer',
    company: 'Creative Studio',
    period: '2022 - 2024',
    detail: 'Delivered polished web interfaces with strong accessibility and performance.',
  },
]

const projects = [
  {
    title: 'Launch-ready Landing Page',
    category: 'Marketing website',
    details: 'Fast, high-conversion design with clear call-to-action flow.',
  },
  {
    title: 'Analytics Dashboard',
    category: 'Admin interface',
    details: 'Intuitive data views, responsive cards, and accessible controls.',
  },
  {
    title: 'Sales & portfolio site',
    category: 'Portfolio website',
    details: 'Personal branding with strong typography, motion, and clarity.',
  },
]

function App() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-slate-900 via-slate-950/90 to-transparent" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-8">
        <header className="relative z-10 flex flex-col gap-5 border-b border-slate-700/80 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Divy Dadhich</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              React portfolio websites that feel handcrafted, confident, and built to convert.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              I build professional personal portfolios and client websites in React + Tailwind, designed to help you win interviews, freelance clients, and long-term work.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <a className="rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 transition hover:border-emerald-400/50 hover:text-white" href="#about">About</a>
            <a className="rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 transition hover:border-emerald-400/50 hover:text-white" href="#experience">Experience</a>
            <a className="rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 transition hover:border-emerald-400/50 hover:text-white" href="#work">Work</a>
            <a className="rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 transition hover:border-emerald-400/50 hover:text-white" href="#contact">Contact</a>
          </nav>
        </header>

        <main className="relative z-10 mt-14 flex-1 space-y-20">
          <section className="grid gap-10 lg:grid-cols-[0.95fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium uppercase tracking-[0.32em] text-emerald-300 ring-1 ring-emerald-300/20">
                Earn trust with a website that feels real
              </span>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                As a React developer focused on human-first experiences, I build portfolio websites, landing pages, and product UI that feel personal, polished, and clear.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-[0_30px_90px_-40px_rgba(16,185,129,0.5)]">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Recent focus</p>
                  <p className="mt-3 text-3xl font-semibold text-white">Portfolio websites</p>
                  <p className="mt-2 text-slate-400">Custom React builds for personal brands and client projects.</p>
                </div>
                <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-6">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Work style</p>
                  <p className="mt-3 text-3xl font-semibold text-white">Clear delivery</p>
                  <p className="mt-2 text-slate-400">Fast turnaround, quality polish, and strong communication.</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <div className="mb-8 rounded-3xl bg-slate-950/80 p-6 ring-1 ring-slate-700/70">
                <p className="text-xs uppercase tracking-[0.32em] text-emerald-400/80">Core strengths</p>
                <div className="mt-6 space-y-4">
                  {heroSkills.map((skill) => (
                    <div key={skill.title} className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-4">
                      <h3 className="text-base font-semibold text-white">{skill.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{skill.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-emerald-500/10 p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-300">Ready for</p>
                  <p className="mt-3 text-2xl font-semibold">Freelance work</p>
                </div>
                <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Available</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Now</p>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">About me</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">A developer who builds websites that feel human-made and hire-ready.</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <div className="space-y-5 rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-8">
                <p className="text-slate-400 leading-8">
                  My work is about more than just code. I help people present their skills and stories with user-friendly interfaces, confident typography, and meaningful detail. Every page is built for fast performance, responsive layouts, and a smooth hiring or client experience.
                </p>
                <ul className="grid gap-3 text-slate-300">
                  <li className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4">React component-based architecture for scalable sites.</li>
                  <li className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4">Tailwind styling with clean spacing and subtle motion.</li>
                  <li className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4">Fast delivery with clear communication and strong QA.</li>
                </ul>
              </div>
              <div className="space-y-4 rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Fast facts</p>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl bg-slate-950/70 p-4">
                      <p className="text-sm text-slate-400">Websites built</p>
                      <p className="mt-2 text-2xl font-semibold text-white">15+</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/70 p-4">
                      <p className="text-sm text-slate-400">Industry focus</p>
                      <p className="mt-2 text-2xl font-semibold text-white">Freelance & hiring portfolios</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-200">
                  <p className="text-sm uppercase tracking-[0.32em]">Why this portfolio</p>
                  <p className="mt-3 text-base leading-7">
                    It shows a strong first impression, clean interaction, and visual clarity—exactly what hiring managers and clients want to see first.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="experience" className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Experience</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Recent work history</h2>
              </div>
              <p className="max-w-xl text-slate-400">A quick overview of roles where I delivered UI-focused React products for teams and freelance clients.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {experience.map((item) => (
                <article key={item.role} className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/40">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.company}</p>
                    </div>
                    <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.32em] text-slate-400">{item.period}</span>
                  </div>
                  <p className="mt-5 text-slate-400">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Selected projects</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Projects built for hiring and pitching clients.</h2>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.title} className="group overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/50">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.32em] text-slate-500">{project.category}</p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">→</span>
                  </div>
                  <p className="mt-5 text-slate-400">{project.details}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/30">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Let’s build together</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready to share your next project brief?</h2>
                <p className="mt-4 max-w-xl text-slate-400">
                  I help people build portfolio websites, landing pages, and product UIs that look professional and feel uniquely crafted.
                </p>
              </div>
              <div className="space-y-4 rounded-3xl bg-slate-950/80 p-6 text-slate-300 ring-1 ring-slate-500/10">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Email</p>
                  <p className="mt-2 text-lg text-white">hello@divyportfolio.dev</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Availability</p>
                  <p className="mt-2 text-lg text-white">Open for freelance and full-time work</p>
                </div>
                <a className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400" href="mailto:hello@divyportfolio.dev">
                  Email me
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
